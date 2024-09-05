// Interfaz para un producto
export interface Product {
  id: string; 
  nombre: string;
  descripcion: string; 
  tamano: string;
  precio: number;
  material: string; 
  cantidad: number; 
  fotoPortada: string; 
  fotosExtras: string[];
  creadoEn: Date; 
}
  
  // Interfaz para los props del botón
  export interface ButtonProps {
    text: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
    icon?: React.ReactNode;
    disabled?: boolean;
  }
  
  // Interfaz para los props del contador
  export interface CounterProps {
    initialCount?: number;
    min?: number;
    max?: number;
    onChange?: (count: number) => void;
  }
  
  // Interfaz para los props de la tarjeta de producto
  export interface CardProps {
    product: Product;
    onClick: () => void;
  }
  
  // Interfaz para los props de la lista de productos
  export interface ProductListProps {
    products: Product[]; // Lista de productos a mostrar
    onProductClick: (id: string) => void; // Función para manejar el clic en un producto para ver detalles
    onAddToCart: (product: Product, quantity: number) => void; // Función para manejar la adición de productos al carrito
  }
  
  // Interfaz para los props del filtro de productos
  export interface ProductFilterProps {
    nameFilter: string;
    sizeFilter: string;
    materialFilter: string;
    onNameFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSizeFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onMaterialFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    sizes: string[];
    materials: string[];
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }