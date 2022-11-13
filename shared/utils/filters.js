// Global filters
import { formatPriceFunc, formatPriceRange } from '@utils/datatypes/money.js';
import { roundToMultiple, formatNumberToThousands, formatNumberSymbol } from '@utils/datatypes/number.js';
import { toTitleCase, formatPhone, getNameInitials, getFirstLetter } from '@utils/datatypes/string.js';
import { formatDate } from '@utils/datatypes/date.js';

import app from '@/app.js';

// --- STRINGS

// Formats string to Title Case
app.filter('titleCase', toTitleCase);
// Formats phone number in format (123)-456-7890
app.filter('formatPhone', formatPhone);
// Initials from full name
app.filter('getNameInitials', getNameInitials);
// First letter from full name
app.filter('getFirstLetter', getFirstLetter);

// --- MONEY

// Formats a price
// Arguments:
// format: 'short' (eg. '270K') else 'simple' (eg. $270,123)
app.filter('formatPrice', formatPriceFunc);
// Formats a price range (eg. [100000, 123456])
// Arguments:
// format: passed to formatPriceFunc()
app.filter('formatPriceRange', formatPriceRange);

// --- NUMBERS

// Rounds a number to a specified multiple
// Eg. (123, 10) => 120
app.filter('roundToMultiple', roundToMultiple);
// Insert thousands commas
// Eg. (1000) => 1,000
app.filter('thousands', formatNumberToThousands);
// Suffixes standard short scale number symbols (k, M, B, T)
// Reference: https://en.wikipedia.org/wiki/Names_of_large_numbers
// maxPrecision: number of decimal significant figures to keep
app.filter('numberSymbol', formatNumberSymbol);

// --- DATES

// Formats a date in locale format
app.filter('formatDate', formatDate);
