/**
 * Purpose: Reusable admin product form UI for create and edit pages.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { PRODUCT_CATEGORIES, PRODUCT_SIZES } from '@/lib/productOptions';

type ProductFormValues = {
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  category?: string;
  sizes?: string[];
  stock?: number;
  isFeatured?: boolean;
  isActive?: boolean;
};

type ProductFormProperties = {
  title: string;
  submitLabel: string;
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ProductFormValues;
  showStatusToggle?: boolean;
};

/**
 * Renders the shared admin product form fields.
 * @param props Component properties.
 * @returns Product form component.
 */
export function ProductForm({
  title,
  submitLabel,
  action,
  defaultValues,
  showStatusToggle = false,
}: ProductFormProperties) {
  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-charcoal">{title}</h1>
      <form action={action} className="space-y-5 rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-charcoal">
            Name
          </label>
          <input id="name" name="name" required defaultValue={defaultValues?.name} className="w-full rounded-md border border-black/15 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-charcoal">
            Description
          </label>
          <textarea id="description" name="description" required rows={4} defaultValue={defaultValues?.description} className="w-full rounded-md border border-black/15 px-3 py-2" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-medium text-charcoal">
              Price
            </label>
            <input id="price" name="price" type="number" min="0" step="0.01" required defaultValue={defaultValues?.price} className="w-full rounded-md border border-black/15 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="stock" className="mb-2 block text-sm font-medium text-charcoal">
              Stock
            </label>
            <input id="stock" name="stock" type="number" min="0" required defaultValue={defaultValues?.stock ?? 0} className="w-full rounded-md border border-black/15 px-3 py-2" />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-charcoal">
            Category
          </label>
          <select id="category" name="category" required defaultValue={defaultValues?.category ?? ''} className="w-full rounded-md border border-black/15 px-3 py-2">
            <option value="" disabled>
              Select a category
            </option>
            {PRODUCT_CATEGORIES.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-charcoal">Sizes</p>
          <div className="flex flex-wrap gap-3">
            {PRODUCT_SIZES.map((sizeOption) => (
              <label key={sizeOption} className="inline-flex items-center gap-2 text-sm text-charcoal">
                <input
                  type="checkbox"
                  name="sizes"
                  value={sizeOption}
                  defaultChecked={defaultValues?.sizes?.includes(sizeOption)}
                  className="h-4 w-4 rounded border-black/20"
                />
                {sizeOption}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium text-charcoal">
            Image URL
          </label>
          <input id="imageUrl" name="imageUrl" type="url" required defaultValue={defaultValues?.imageUrl} className="w-full rounded-md border border-black/15 px-3 py-2" />
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="inline-flex items-center gap-2 text-sm text-charcoal">
            <input type="checkbox" name="isFeatured" defaultChecked={defaultValues?.isFeatured} className="h-4 w-4 rounded border-black/20" />
            Featured
          </label>
          {showStatusToggle && (
            <label className="inline-flex items-center gap-2 text-sm text-charcoal">
              <input type="checkbox" name="isActive" defaultChecked={defaultValues?.isActive ?? true} className="h-4 w-4 rounded border-black/20" />
              Active
            </label>
          )}
        </div>
        <button type="submit" className="rounded-md bg-charcoal px-4 py-2 font-medium text-white transition hover:bg-black">
          {submitLabel}
        </button>
      </form>
    </section>
  );
}
