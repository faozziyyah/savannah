import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (i: string) => {
  return moment(i).format('MMM Do YY');
};

export const sentenceCase = (str: string) => {
  if (!str) return '';

  // return str;/
  return str?.charAt(0).toUpperCase() + str?.slice(1)?.toLowerCase();
};

export function sentenceCaseEachWord(str: string) {
  if (str) {
    return str
      .split(' ')
      .map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase())
      .join(' ');
  }
  return '';
}

// export function splitAmountByThousands(amount) {
//   if (!amount) return ' 0.00';
//   const parts = [];
//   let remaining = amount?.toString();

//   while (remaining.length > 3) {
//     parts.unshift(remaining.slice(-3));
//     remaining = remaining.slice(0, -3);
//   }

//   if (remaining.length > 0) {
//     parts.unshift(remaining);
//   }

//   return parts.join(',');
// }

export function splitAmountByThousands(amount: string) {
  if (!amount) return '0.00';
  amount = amount.toString().trim(); // Remove leading and trailing spaces
  const parts = [];
  let remaining = amount;

  while (remaining.length > 3) {
    parts.unshift(remaining.slice(-3));
    remaining = remaining.slice(0, -3);
  }

  if (remaining.length > 0) {
    parts.unshift(remaining);
  }

  return parts.join(',').replace(/,$/, ''); // Remove trailing comma
}