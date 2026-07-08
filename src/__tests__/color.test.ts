import { describe, expect, it } from 'vitest';

import { colorFromRepoName, parseHexColor } from '../color.js';
import { ACCENT_COLOR } from '../types.js';

describe('parseHexColor', () => {
  it('parses hex colors with a leading hash', () => {
    expect(parseHexColor('#F1E542')).toBe(0xf1e542);
  });

  it('parses hex colors without a leading hash', () => {
    expect(parseHexColor('F1E542')).toBe(0xf1e542);
  });

  it('trims surrounding whitespace', () => {
    expect(parseHexColor('  #AABBCC  ')).toBe(0xaabbcc);
  });

  it('returns undefined for invalid hex values', () => {
    expect(parseHexColor('')).toBeUndefined();
    expect(parseHexColor('   ')).toBeUndefined();
    expect(parseHexColor('#GGG')).toBeUndefined();
    expect(parseHexColor('12345')).toBeUndefined();
    expect(parseHexColor('#1234567')).toBeUndefined();
  });
});

describe('colorFromRepoName', () => {
  it('returns the same accent color for the same repo name', () => {
    expect(colorFromRepoName('Qbox-project/txAdminRecipe')).toBe(
      colorFromRepoName('Qbox-project/txAdminRecipe'),
    );
  });

  it('returns different accent colors for different repo names', () => {
    expect(colorFromRepoName('Qbox-project/qbx_core')).not.toBe(
      colorFromRepoName('Qbox-project/txAdminRecipe'),
    );
  });

  it('falls back to the default accent color when repo name is empty', () => {
    expect(colorFromRepoName('')).toBe(ACCENT_COLOR);
  });
});
