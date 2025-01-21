import { Button } from '@/components/ui/button'

const categories = ['Spa', 'Restaurantes', 'Ocio', 'Viajes', 'Belleza']

interface OfferFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function OfferFilters({ selectedCategory, onCategoryChange }: OfferFiltersProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant={selectedCategory === '' ? 'default' : 'outline'}
        onClick={() => onCategoryChange('')}
      >
        Todos
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}