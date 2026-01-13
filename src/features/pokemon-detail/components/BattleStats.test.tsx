import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BattleStats } from './BattleStats';

describe('BattleStats', () => {
  const mockStats = [
    { base_stat: 35, effort: 0, stat: { name: 'hp', url: 'https://example.com/hp' } },
    { base_stat: 55, effort: 0, stat: { name: 'attack', url: 'https://example.com/attack' } },
    { base_stat: 40, effort: 0, stat: { name: 'defense', url: 'https://example.com/defense' } },
    { base_stat: 50, effort: 0, stat: { name: 'special-attack', url: 'https://example.com/special-attack' } },
    { base_stat: 50, effort: 0, stat: { name: 'special-defense', url: 'https://example.com/special-defense' } },
    { base_stat: 90, effort: 2, stat: { name: 'speed', url: 'https://example.com/speed' } },
  ];

  it('renders section title', () => {
    render(<BattleStats stats={mockStats} />);
    
    expect(screen.getByText('Battle Stats')).toBeInTheDocument();
  });

  it('renders all stat names', () => {
    render(<BattleStats stats={mockStats} />);
    
    expect(screen.getByText('hp')).toBeInTheDocument();
    expect(screen.getByText('attack')).toBeInTheDocument();
    expect(screen.getByText('defense')).toBeInTheDocument();
    expect(screen.getByText('special attack')).toBeInTheDocument();
    expect(screen.getByText('special defense')).toBeInTheDocument();
    expect(screen.getByText('speed')).toBeInTheDocument();
  });

  it('renders all stat values', () => {
    render(<BattleStats stats={mockStats} />);

    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    // Use getAllByText for duplicate values
    const fiftyValues = screen.getAllByText('50');
    expect(fiftyValues.length).toBe(2); // special-attack and special-defense
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  it('replaces hyphens with spaces in stat names', () => {
    render(<BattleStats stats={mockStats} />);
    
    expect(screen.getByText('special attack')).toBeInTheDocument();
    expect(screen.getByText('special defense')).toBeInTheDocument();
  });

  it('renders with undefined stats', () => {
    render(<BattleStats stats={undefined} />);
    
    expect(screen.getByText('Battle Stats')).toBeInTheDocument();
    // All stats should show 0
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThan(0);
  });

  it('renders with empty stats array', () => {
    render(<BattleStats stats={[]} />);
    
    expect(screen.getByText('Battle Stats')).toBeInTheDocument();
    // All stats should show 0
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThan(0);
  });

  it('renders with partial stats', () => {
    const partialStats = [
      { base_stat: 100, effort: 0, stat: { name: 'hp', url: 'https://example.com/hp' } },
      { base_stat: 80, effort: 0, stat: { name: 'attack', url: 'https://example.com/attack' } },
    ];
    
    render(<BattleStats stats={partialStats} />);
    
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    // Missing stats should show 0
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThan(0);
  });

  it('handles high stat values', () => {
    const highStats = [
      { base_stat: 255, effort: 0, stat: { name: 'hp', url: 'https://example.com/hp' } },
      { base_stat: 200, effort: 0, stat: { name: 'attack', url: 'https://example.com/attack' } },
      { base_stat: 150, effort: 0, stat: { name: 'defense', url: 'https://example.com/defense' } },
      { base_stat: 180, effort: 0, stat: { name: 'special-attack', url: 'https://example.com/special-attack' } },
      { base_stat: 170, effort: 0, stat: { name: 'special-defense', url: 'https://example.com/special-defense' } },
      { base_stat: 120, effort: 0, stat: { name: 'speed', url: 'https://example.com/speed' } },
    ];
    
    render(<BattleStats stats={highStats} />);
    
    expect(screen.getByText('255')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('renders stat bars for each stat', () => {
    render(<BattleStats stats={mockStats} />);

    // Verify all stats are rendered (6 stats total)
    expect(screen.getByText('hp')).toBeInTheDocument();
    expect(screen.getByText('attack')).toBeInTheDocument();
    expect(screen.getByText('defense')).toBeInTheDocument();
    expect(screen.getByText('special attack')).toBeInTheDocument();
    expect(screen.getByText('special defense')).toBeInTheDocument();
    expect(screen.getByText('speed')).toBeInTheDocument();
  });
});

