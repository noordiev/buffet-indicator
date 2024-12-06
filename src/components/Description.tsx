import { Twitter } from 'lucide-react';

export function Description() {
  return (
    <div className="max-w-2xl mx-auto mt-8 text-center">
      <p className="text-gray-600 leading-relaxed mb-6">
        The Buffett Indicator, named after legendary investor Warren Buffett, is a measure of the total value of all publicly traded stocks in a market divided by the country's GDP. A ratio above 100% suggests an overvalued market, while a ratio below 100% suggests an undervalued market. Warren Buffett has called this indicator "probably the best single measure of where valuations stand at any given moment."
      </p>
      <a
        href="https://twitter.com/yourhandle"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Twitter size={20} />
        <span>Follow us on Twitter</span>
      </a>
    </div>
  );
}