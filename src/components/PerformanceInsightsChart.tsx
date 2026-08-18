import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TrendingUp, BarChart3, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { playSubtleClickSound } from '../utils/motion';

type MetricTab = 'retention' | 'conversion' | 'pacing';

interface RetentionDataPoint {
  time: string;
  seconds: number;
  customEdit: number;
  industryAvg: number;
  beat: string;
  insight: string;
}

interface ConversionDataPoint {
  format: string;
  standard: number;
  optimized: number;
  lift: string;
}

interface PacingDataPoint {
  phase: string;
  cutsPerMin: number;
  energyLevel: number;
  dropOffRisk: number;
}

const RETENTION_DATA: RetentionDataPoint[] = [
  { time: '0s', seconds: 0, customEdit: 99, industryAvg: 85, beat: 'Kinetic Hook', insight: 'First 3 seconds retain 94%+ viewers with sound-synced kinetic intro' },
  { time: '5s', seconds: 5, customEdit: 94, industryAvg: 62, beat: 'Problem Framing', insight: 'Visual speed-ramp prevents typical 5-second drop-off spike' },
  { time: '15s', seconds: 15, customEdit: 89, industryAvg: 48, beat: 'UI & Product Reveal', insight: 'Micro-interactions & spatial 3D transitions sustain visual focus' },
  { time: '30s', seconds: 30, customEdit: 85, industryAvg: 39, beat: 'Feature Workflow', insight: 'Pacing variations re-engage attention past the midpoint' },
  { time: '45s', seconds: 45, customEdit: 81, industryAvg: 32, beat: 'Social Proof / Trust', insight: 'Cinematic color grading & audio risers prepare viewer for CTA' },
  { time: '60s', seconds: 60, customEdit: 76, industryAvg: 24, beat: 'Conversion CTA', insight: 'Over 3x industry benchmark completes the call-to-action' },
];

const CONVERSION_DATA: ConversionDataPoint[] = [
  { format: 'SaaS UI Promos', standard: 1.8, optimized: 5.2, lift: '+188%' },
  { format: '9:16 Reels / Shorts', standard: 2.2, optimized: 7.6, lift: '+245%' },
  { format: 'Brand Commercials', standard: 1.4, optimized: 4.3, lift: '+207%' },
  { format: 'Talking Head / Docs', standard: 2.9, optimized: 6.8, lift: '+134%' },
];

const PACING_DATA: PacingDataPoint[] = [
  { phase: 'Hook (0-5s)', cutsPerMin: 48, energyLevel: 95, dropOffRisk: 8 },
  { phase: 'Setup (5-15s)', cutsPerMin: 32, energyLevel: 78, dropOffRisk: 12 },
  { phase: 'Climax (15-35s)', cutsPerMin: 42, energyLevel: 88, dropOffRisk: 14 },
  { phase: 'Proof (35-50s)', cutsPerMin: 28, energyLevel: 72, dropOffRisk: 16 },
  { phase: 'Outro (50-60s)', cutsPerMin: 36, energyLevel: 85, dropOffRisk: 22 },
];

export const PerformanceInsightsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MetricTab>('retention');
  const [hoveredPoint, setHoveredPoint] = useState<RetentionDataPoint | null>(null);
  const [hoveredBar, setHoveredBar] = useState<ConversionDataPoint | null>(null);
  const [hoveredPacing, setHoveredPacing] = useState<PacingDataPoint | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 640;
    const height = 280;
    const margin = { top: 24, right: 28, bottom: 42, left: 46 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define Gradients & Filters
    const defs = svg.append('defs');

    // Gradient for Custom Edit Area
    const customAreaGradient = defs
      .append('linearGradient')
      .attr('id', 'customEditGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    customAreaGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3B82F6')
      .attr('stop-opacity', 0.45);

    customAreaGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3B82F6')
      .attr('stop-opacity', 0.02);

    // Gradient for Industry Avg Area
    const avgAreaGradient = defs
      .append('linearGradient')
      .attr('id', 'avgGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    avgAreaGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#94A3B8')
      .attr('stop-opacity', 0.15);

    avgAreaGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#94A3B8')
      .attr('stop-opacity', 0.0);

    // Gradient for Bar Chart
    const barGradient = defs
      .append('linearGradient')
      .attr('id', 'barHighlightGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    barGradient.append('stop').attr('offset', '0%').attr('stop-color', '#2563EB');
    barGradient.append('stop').attr('offset', '100%').attr('stop-color', '#60A5FA');

    // TAB 1: RETENTION RATE CURVE
    if (activeTab === 'retention') {
      const xScale = d3
        .scaleLinear()
        .domain([0, 60])
        .range([0, innerWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0]);

      // Grid Lines
      const yTicks = [25, 50, 75, 100];
      g.append('g')
        .attr('class', 'grid')
        .selectAll('line')
        .data(yTicks)
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', (d) => yScale(d))
        .attr('y2', (d) => yScale(d))
        .attr('stroke', 'currentColor')
        .attr('stroke-opacity', 0.08)
        .attr('stroke-dasharray', '3,3');

      // X Axis
      const xAxis = d3
        .axisBottom(xScale)
        .tickValues([0, 15, 30, 45, 60])
        .tickFormat((d) => `${d}s`);

      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis)
        .call((sel) => sel.select('.domain').attr('stroke-opacity', 0.15))
        .call((sel) => sel.selectAll('.tick line').attr('stroke-opacity', 0.15))
        .call((sel) =>
          sel
            .selectAll('.tick text')
            .attr('fill', 'currentColor')
            .attr('fill-opacity', 0.6)
            .attr('font-size', '11px')
            .attr('font-family', 'monospace')
        );

      // Y Axis
      const yAxis = d3
        .axisLeft(yScale)
        .tickValues([25, 50, 75, 100])
        .tickFormat((d) => `${d}%`);

      g.append('g')
        .call(yAxis)
        .call((sel) => sel.select('.domain').attr('stroke-opacity', 0))
        .call((sel) => sel.selectAll('.tick line').attr('stroke-opacity', 0))
        .call((sel) =>
          sel
            .selectAll('.tick text')
            .attr('fill', 'currentColor')
            .attr('fill-opacity', 0.6)
            .attr('font-size', '11px')
            .attr('font-family', 'monospace')
        );

      // Industry Area & Line
      const avgArea = d3
        .area<RetentionDataPoint>()
        .x((d) => xScale(d.seconds))
        .y0(innerHeight)
        .y1((d) => yScale(d.industryAvg))
        .curve(d3.curveMonotoneX);

      const avgLine = d3
        .line<RetentionDataPoint>()
        .x((d) => xScale(d.seconds))
        .y((d) => yScale(d.industryAvg))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(RETENTION_DATA)
        .attr('fill', 'url(#avgGradient)')
        .attr('d', avgArea);

      g.append('path')
        .datum(RETENTION_DATA)
        .attr('fill', 'none')
        .attr('stroke', '#94A3B8')
        .attr('stroke-width', 1.8)
        .attr('stroke-dasharray', '4,4')
        .attr('stroke-opacity', 0.6)
        .attr('d', avgLine);

      // Custom Edit Area & Line
      const customArea = d3
        .area<RetentionDataPoint>()
        .x((d) => xScale(d.seconds))
        .y0(innerHeight)
        .y1((d) => yScale(d.customEdit))
        .curve(d3.curveMonotoneX);

      const customLine = d3
        .line<RetentionDataPoint>()
        .x((d) => xScale(d.seconds))
        .y((d) => yScale(d.customEdit))
        .curve(d3.curveMonotoneX);

      const areaPath = g
        .append('path')
        .datum(RETENTION_DATA)
        .attr('fill', 'url(#customEditGradient)')
        .attr('d', customArea)
        .attr('opacity', 0);

      areaPath.transition().duration(600).attr('opacity', 1);

      const linePath = g
        .append('path')
        .datum(RETENTION_DATA)
        .attr('fill', 'none')
        .attr('stroke', '#3B82F6')
        .attr('stroke-width', 2.8)
        .attr('d', customLine);

      // Animate line drawing
      const pathEl = linePath.node();
      if (pathEl) {
        const totalLength = pathEl.getTotalLength();
        linePath
          .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
          .attr('stroke-dashoffset', totalLength)
          .transition()
          .duration(900)
          .ease(d3.easeCubicOut)
          .attr('stroke-dashoffset', 0);
      }

      // Interactive Data Points
      const dotsGroup = g.append('g').attr('class', 'dots');

      dotsGroup
        .selectAll('.point-circle-bg')
        .data(RETENTION_DATA)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.seconds))
        .attr('cy', (d) => yScale(d.customEdit))
        .attr('r', 8)
        .attr('fill', '#3B82F6')
        .attr('fill-opacity', 0.15)
        .attr('class', 'cursor-pointer')
        .on('mouseenter', (_, d) => setHoveredPoint(d));

      dotsGroup
        .selectAll('.point-circle')
        .data(RETENTION_DATA)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.seconds))
        .attr('cy', (d) => yScale(d.customEdit))
        .attr('r', 4)
        .attr('fill', '#FFFFFF')
        .attr('stroke', '#2563EB')
        .attr('stroke-width', 2.2)
        .attr('class', 'cursor-pointer transition-transform duration-200 hover:scale-150')
        .on('mouseenter', (_, d) => setHoveredPoint(d));

      // Benchmark delta tag at 60s
      const lastPoint = RETENTION_DATA[RETENTION_DATA.length - 1];
      g.append('text')
        .attr('x', xScale(lastPoint.seconds) - 6)
        .attr('y', yScale(lastPoint.customEdit) - 10)
        .attr('text-anchor', 'end')
        .attr('fill', '#3B82F6')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('font-family', 'monospace')
        .text('+52% vs Avg');
    }

    // TAB 2: CONVERSION LIFT COMPARISON
    else if (activeTab === 'conversion') {
      const x0Scale = d3
        .scaleBand()
        .domain(CONVERSION_DATA.map((d) => d.format))
        .range([0, innerWidth])
        .padding(0.28);

      const yScale = d3.scaleLinear().domain([0, 9]).range([innerHeight, 0]);

      // Grid Lines
      g.append('g')
        .attr('class', 'grid')
        .selectAll('line')
        .data([2, 4, 6, 8])
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', (d) => yScale(d))
        .attr('y2', (d) => yScale(d))
        .attr('stroke', 'currentColor')
        .attr('stroke-opacity', 0.08)
        .attr('stroke-dasharray', '3,3');

      // X Axis
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x0Scale))
        .call((sel) => sel.select('.domain').attr('stroke-opacity', 0.15))
        .call((sel) => sel.selectAll('.tick line').attr('stroke-opacity', 0))
        .call((sel) =>
          sel
            .selectAll('.tick text')
            .attr('fill', 'currentColor')
            .attr('fill-opacity', 0.75)
            .attr('font-size', '10px')
            .attr('font-weight', '500')
        );

      // Y Axis
      g.append('g')
        .call(
          d3
            .axisLeft(yScale)
            .ticks(4)
            .tickFormat((d) => `${d}%`)
        )
        .call((sel) => sel.select('.domain').attr('stroke-opacity', 0))
        .call((sel) => sel.selectAll('.tick line').attr('stroke-opacity', 0))
        .call((sel) =>
          sel
            .selectAll('.tick text')
            .attr('fill', 'currentColor')
            .attr('fill-opacity', 0.6)
            .attr('font-size', '11px')
            .attr('font-family', 'monospace')
        );

      const groupWidth = x0Scale.bandwidth();
      const barWidth = (groupWidth - 8) / 2;

      CONVERSION_DATA.forEach((d) => {
        const groupX = x0Scale(d.format) || 0;

        // Standard Bar
        g.append('rect')
          .attr('x', groupX)
          .attr('y', innerHeight)
          .attr('width', barWidth)
          .attr('height', 0)
          .attr('rx', 4)
          .attr('fill', '#94A3B8')
          .attr('fill-opacity', 0.4)
          .transition()
          .duration(600)
          .attr('y', yScale(d.standard))
          .attr('height', innerHeight - yScale(d.standard));

        // Optimized Bar
        g.append('rect')
          .attr('x', groupX + barWidth + 6)
          .attr('y', innerHeight)
          .attr('width', barWidth)
          .attr('height', 0)
          .attr('rx', 4)
          .attr('fill', 'url(#barHighlightGradient)')
          .attr('class', 'cursor-pointer')
          .on('mouseenter', () => setHoveredBar(d))
          .transition()
          .duration(750)
          .delay(100)
          .attr('y', yScale(d.optimized))
          .attr('height', innerHeight - yScale(d.optimized));

        // Lift Badge
        g.append('text')
          .attr('x', groupX + groupWidth / 2)
          .attr('y', yScale(d.optimized) - 8)
          .attr('text-anchor', 'middle')
          .attr('fill', '#3B82F6')
          .attr('font-size', '10px')
          .attr('font-weight', '700')
          .attr('font-family', 'monospace')
          .text(d.lift);
      });
    }

    // TAB 3: PACING & ENERGY MATRIX
    else if (activeTab === 'pacing') {
      const xScale = d3
        .scaleBand()
        .domain(PACING_DATA.map((d) => d.phase))
        .range([0, innerWidth])
        .padding(0.2);

      const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

      // Energy curve
      const energyLine = d3
        .line<PacingDataPoint>()
        .x((d) => (xScale(d.phase) || 0) + xScale.bandwidth() / 2)
        .y((d) => yScale(d.energyLevel))
        .curve(d3.curveCatmullRom);

      const energyArea = d3
        .area<PacingDataPoint>()
        .x((d) => (xScale(d.phase) || 0) + xScale.bandwidth() / 2)
        .y0(innerHeight)
        .y1((d) => yScale(d.energyLevel))
        .curve(d3.curveCatmullRom);

      g.append('path')
        .datum(PACING_DATA)
        .attr('fill', 'url(#customEditGradient)')
        .attr('d', energyArea);

      g.append('path')
        .datum(PACING_DATA)
        .attr('fill', 'none')
        .attr('stroke', '#3B82F6')
        .attr('stroke-width', 2.5)
        .attr('d', energyLine);

      // Cuts per minute bars
      PACING_DATA.forEach((d) => {
        const xPos = xScale(d.phase) || 0;
        g.append('rect')
          .attr('x', xPos + xScale.bandwidth() * 0.25)
          .attr('y', innerHeight)
          .attr('width', xScale.bandwidth() * 0.5)
          .attr('height', 0)
          .attr('rx', 3)
          .attr('fill', '#60A5FA')
          .attr('fill-opacity', 0.3)
          .attr('class', 'cursor-pointer')
          .on('mouseenter', () => setHoveredPacing(d))
          .transition()
          .duration(600)
          .attr('y', yScale(d.cutsPerMin))
          .attr('height', innerHeight - yScale(d.cutsPerMin));
      });

      // X Axis
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .call((sel) => sel.select('.domain').attr('stroke-opacity', 0.15))
        .call((sel) => sel.selectAll('.tick line').attr('stroke-opacity', 0))
        .call((sel) =>
          sel
            .selectAll('.tick text')
            .attr('fill', 'currentColor')
            .attr('fill-opacity', 0.75)
            .attr('font-size', '10px')
        );

      // Y Axis
      g.append('g')
        .call(d3.axisLeft(yScale).ticks(4))
        .call((sel) => sel.select('.domain').attr('stroke-opacity', 0))
        .call((sel) => sel.selectAll('.tick line').attr('stroke-opacity', 0))
        .call((sel) =>
          sel
            .selectAll('.tick text')
            .attr('fill', 'currentColor')
            .attr('fill-opacity', 0.6)
            .attr('font-size', '10px')
            .attr('font-family', 'monospace')
        );
    }
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="mt-14 w-full bg-white dark:bg-[#161618] border border-black/[0.06] dark:border-white/[0.06] rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Banner with Stats & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[1.5px] text-[#0066FF] dark:text-[#3B82F6] font-mono">
              PERFORMANCE INSIGHTS & D3 ANALYTICS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
            Data-Backed Video Retention & Conversion Lift
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#98989D] mt-1 max-w-xl">
            Interactive D3 visualization comparing rhythmic kinetic pacing against standard unoptimized industry edits.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#F1F5F9] dark:bg-[#0E0E10] p-1 rounded-xl border border-black/[0.04] dark:border-white/[0.06] self-start lg:self-auto">
          <button
            onClick={() => {
              playSubtleClickSound();
              setActiveTab('retention');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'retention'
                ? 'bg-white dark:bg-[#1E1E22] text-[#0F172A] dark:text-white shadow-xs'
                : 'text-[#64748B] dark:text-[#98989D] hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Retention Rate</span>
          </button>

          <button
            onClick={() => {
              playSubtleClickSound();
              setActiveTab('conversion');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'conversion'
                ? 'bg-white dark:bg-[#1E1E22] text-[#0F172A] dark:text-white shadow-xs'
                : 'text-[#64748B] dark:text-[#98989D] hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Conversion Lift</span>
          </button>

          <button
            onClick={() => {
              playSubtleClickSound();
              setActiveTab('pacing');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'pacing'
                ? 'bg-white dark:bg-[#1E1E22] text-[#0F172A] dark:text-white shadow-xs'
                : 'text-[#64748B] dark:text-[#98989D] hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Pacing & Beats</span>
          </button>
        </div>
      </div>

      {/* Main Chart Area + Metric Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
        {/* D3 Render Area */}
        <div className="lg:col-span-8 relative">
          {/* Legend */}
          <div className="flex items-center gap-5 mb-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full bg-[#3B82F6]" />
              <span className="font-medium text-[#0F172A] dark:text-[#E2E8F0]">whtamim Kinetic Edit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full bg-[#94A3B8] border border-dashed border-[#94A3B8]" />
              <span className="text-[#64748B] dark:text-[#94A3B8]">Standard Edit Benchmark</span>
            </div>
          </div>

          <div className="w-full relative overflow-hidden">
            <svg
              ref={svgRef}
              className="w-full h-auto text-neutral-800 dark:text-neutral-200"
              style={{ minHeight: '230px' }}
            />
          </div>

          {/* Interactive Highlight Details Pill */}
          {activeTab === 'retention' && (
            <div className="mt-3 p-3 bg-[#F8FAFC] dark:bg-[#0E0E10] border border-black/[0.04] dark:border-white/[0.04] rounded-xl flex items-start gap-2.5 text-xs text-[#475569] dark:text-[#A1A1AA]">
              <Zap className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#0F172A] dark:text-white">
                  {hoveredPoint ? `${hoveredPoint.time} (${hoveredPoint.beat})` : '0s–60s Retention Arc'}:
                </span>{' '}
                {hoveredPoint
                  ? hoveredPoint.insight
                  : 'Hover over data points to inspect how micro-interaction keyframes, sound design, and kinetic typography maintain high viewer engagement.'}
              </div>
            </div>
          )}

          {activeTab === 'conversion' && hoveredBar && (
            <div className="mt-3 p-3 bg-[#F8FAFC] dark:bg-[#0E0E10] border border-black/[0.04] dark:border-white/[0.04] rounded-xl flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0F172A] dark:text-white">{hoveredBar.format}:</span>
              <span className="text-[#3B82F6] font-bold font-mono">
                {hoveredBar.standard}% standard → {hoveredBar.optimized}% kinetic edit ({hoveredBar.lift})
              </span>
            </div>
          )}

          {activeTab === 'pacing' && hoveredPacing && (
            <div className="mt-3 p-3 bg-[#F8FAFC] dark:bg-[#0E0E10] border border-black/[0.04] dark:border-white/[0.04] rounded-xl flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0F172A] dark:text-white">{hoveredPacing.phase}:</span>
              <span className="text-[#3B82F6] font-mono">
                {hoveredPacing.cutsPerMin} cuts/min • Energy {hoveredPacing.energyLevel}% • Drop-off risk {hoveredPacing.dropOffRisk}%
              </span>
            </div>
          )}
        </div>

        {/* Key KPI Highlights Panel */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#1C1C1F] border border-black/[0.04] dark:border-white/[0.04]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#98989D] uppercase tracking-wider font-mono">
                Hook Hold (First 3s)
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-[#0F172A] dark:text-white mt-1 font-mono">
              94.2%
            </div>
            <p className="text-[11px] text-[#64748B] dark:text-[#98989D] mt-0.5">
              Instant kinetic lock preventing early swipe away.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#1C1C1F] border border-black/[0.04] dark:border-white/[0.04]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#98989D] uppercase tracking-wider font-mono">
                Avg. CTA Completion
              </span>
              <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div className="text-2xl font-bold text-[#0F172A] dark:text-white mt-1 font-mono">
              76.0%
            </div>
            <p className="text-[11px] text-[#64748B] dark:text-[#98989D] mt-0.5">
              3.1x higher viewer retention at the final conversion screen.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#1C1C1F] border border-black/[0.04] dark:border-white/[0.04]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#98989D] uppercase tracking-wider font-mono">
                Organic CTR Lift
              </span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-[#0F172A] dark:text-white mt-1 font-mono">
              +245%
            </div>
            <p className="text-[11px] text-[#64748B] dark:text-[#98989D] mt-0.5">
              Average increase in viewer click-through conversion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
