import React, { useRef, useEffect } from 'react';

const AnimatedChart = ({ data, width = 400, height = 200 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw animated chart
    const maxValue = Math.max(...data);
    const barWidth = width / data.length;
    
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * height;
      const x = index * barWidth;
      const y = height - barHeight;
      
      // Gradient fill
      const gradient = ctx.createLinearGradient(0, y, 0, height);
      gradient.addColorStop(0, '#4361ee');
      gradient.addColorStop(1, '#3a0ca3');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      
      // Animation effect
      setTimeout(() => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 2, y, barWidth - 4, 2);
      }, index * 100);
    });
  }, [data, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default AnimatedChart;