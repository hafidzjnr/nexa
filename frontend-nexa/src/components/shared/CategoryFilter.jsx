/**
 * Category filter component.
 * Displays a list of categories and calls onSelect when one is chosen.
 */
export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === cat
              ? 'bg-white text-nexa-dark'
              : 'bg-nexa-card border border-nexa-border text-white/60 hover:text-white hover:border-nexa-primary/50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}