"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Search, Plus, Edit, Trash2, AlertTriangle, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  price: number
  lastUpdated: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Dell XPS 13",
    category: "Electrónicos",
    stock: 15,
    minStock: 5,
    price: 1299.99,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Silla de Oficina Ergonómica",
    category: "Muebles",
    stock: 3,
    minStock: 10,
    price: 299.99,
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: 'Monitor 4K 27"',
    category: "Electrónicos",
    stock: 8,
    minStock: 3,
    price: 449.99,
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    name: "Teclado Mecánico RGB",
    category: "Accesorios",
    stock: 25,
    minStock: 15,
    price: 129.99,
    lastUpdated: "2024-01-12",
  },
]

export function InventoryDashboard() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const lowStockProducts = products.filter((product) => product.stock <= product.minStock)
  const totalValue = products.reduce((sum, product) => sum + product.stock * product.price, 0)
  const totalProducts = products.reduce((sum, product) => sum + product.stock, 0)

  const getStockStatus = (product: Product) => {
    if (product.stock <= product.minStock) return "low"
    if (product.stock <= product.minStock * 2) return "medium"
    return "high"
  }

  const getStockBadge = (product: Product) => {
    const status = getStockStatus(product)
    if (status === "low") return <Badge variant="destructive">Stock Bajo</Badge>
    if (status === "medium") return <Badge variant="secondary">Stock Medio</Badge>
    return <Badge variant="default">Stock Alto</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Sistema de Inventario</h1>
                <p className="text-sm text-muted-foreground">Gestiona tu inventario de manera eficiente</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Producto
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorías</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{[...new Set(products.map((p) => p.category))].length}</div>
              <p className="text-xs text-muted-foreground">Diferentes categorías</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{lowStockProducts.length}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 inline mr-1" />
                Requieren atención
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Buscar Productos</CardTitle>
                <CardDescription>Encuentra productos por nombre o categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">Filtros</Button>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </div>
                      {getStockBadge(product)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Stock actual:</span>
                        <span className="font-semibold">{product.stock} unidades</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Stock mínimo:</span>
                        <span className="text-sm">{product.minStock} unidades</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Precio:</span>
                        <span className="font-semibold">${product.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Última actualización:</span>
                        <span className="text-sm">{product.lastUpdated}</span>
                      </div>

                      <div className="flex gap-2 pt-3">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
                  <p className="text-muted-foreground mb-4">No hay productos que coincidan con tu búsqueda.</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Primer Producto
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Categorías</CardTitle>
                <CardDescription>Organiza tus productos por categorías</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
                  <p className="text-muted-foreground">La gestión de categorías estará disponible pronto.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reportes y Análisis</CardTitle>
                <CardDescription>Visualiza estadísticas y tendencias de tu inventario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
                  <p className="text-muted-foreground">Los reportes y análisis estarán disponibles pronto.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
