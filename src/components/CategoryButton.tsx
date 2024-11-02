import { Category } from "@/graphql/types";

interface CategoryButtonProps {
  category: Category;
  isActive: boolean;
  onClick: (category: Category) => void;
}

export default function CategoryButton({
  category,
  isActive,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      onClick={() => onClick(category)}
      className={`
      px-2 py-1 rounded-full
      transition-colors duration-200
      ${isActive ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-500"}
      `}
    >
      <p className="whitespace-nowrap">{category.name}</p>
    </button>
  );
}
