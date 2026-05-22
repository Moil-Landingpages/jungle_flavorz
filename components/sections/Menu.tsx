"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Leaf, Search, Eye, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { menuData, type MenuItem } from "@/data/menu";
import { useGsapReveal } from "@/lib/useGsapReveal";

export function Menu() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const ref = useGsapReveal();

  const filter = (items: MenuItem[]) => {
    if (!searchQuery) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  };

  return (
    <section
      id="menu"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-cream-white"
    >
      <div className="container">
        <div className="text-center mb-14">
          <span
            data-reveal
            className="inline-block text-caramel font-dancing text-2xl mb-2"
          >
            Our Menu
          </span>
          <h2
            data-reveal
            className="font-playfair text-4xl md:text-5xl font-black text-warm-brown mb-4"
          >
            A taste of Burundi &amp; East Africa
          </h2>
          <p
            data-reveal
            className="text-lg text-warm-brown/70 max-w-2xl mx-auto"
          >
            Each dish is crafted with authentic ingredients and traditional
            recipes. All dishes are gentle on the palate — not spicy. A
            complimentary spicy sauce is available on the side for those who
            love extra heat.
          </p>
        </div>

        <div data-reveal className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-brown/40 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 py-6 text-base rounded-full border-warm-brown/15 bg-white shadow-sm"
            />
          </div>
        </div>

        <Tabs defaultValue="mains" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-12 h-auto p-1 bg-soft-beige/60 rounded-full">
            <TabsTrigger value="mains" className="rounded-full py-2.5">
              Mains
            </TabsTrigger>
            <TabsTrigger value="appetizers" className="rounded-full py-2.5">
              Appetizers
            </TabsTrigger>
            <TabsTrigger value="sides" className="rounded-full py-2.5">
              Sides &amp; Salads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mains" className="space-y-8">
            <FeaturedShowcase
              items={[menuData.mains[0], menuData.mains[3]]}
              onSelect={setSelectedItem}
            />
            <GridSection
              items={filter(menuData.mains)}
              onSelect={setSelectedItem}
            />
          </TabsContent>

          <TabsContent value="appetizers">
            <GridSection
              items={filter(menuData.appetizers)}
              onSelect={setSelectedItem}
            />
          </TabsContent>

          <TabsContent value="sides">
            <GridSection
              items={filter(menuData.sides)}
              onSelect={setSelectedItem}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-14 text-center">
          <button
            onClick={() => setShowFullMenu(true)}
            className="inline-flex items-center gap-2 px-7 py-3 bg-warm-brown hover:bg-bronze text-cream-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View Full Traditional Menu
          </button>
        </div>
      </div>

      {/* Item Detail Modal */}
      <Dialog
        open={selectedItem !== null}
        onOpenChange={() => setSelectedItem(null)}
      >
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="font-playfair text-3xl">
                  {selectedItem.name}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              {selectedItem.images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={selectedItem.images[0]}
                      alt={selectedItem.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                    />
                  </div>
                  {selectedItem.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedItem.images.slice(1).map((image, idx) => (
                        <button
                          key={idx}
                          className="relative h-16 rounded overflow-hidden hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(image)}
                        >
                          <Image
                            src={image}
                            alt={`${selectedItem.name} ${idx + 2}`}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4 pt-4">
                <div className="flex flex-wrap gap-2">
                  {selectedItem.vegetarian && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                      <Leaf className="w-3 h-3 mr-1" /> Vegetarian
                    </Badge>
                  )}
                  {selectedItem.glutenFree && (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      Gluten-Free
                    </Badge>
                  )}
                  <Badge className="bg-soft-beige text-warm-brown hover:bg-soft-beige">
                    Not Spicy
                  </Badge>
                </div>

                {selectedItem.servings && (
                  <div>
                    <h4 className="font-semibold mb-1">Servings</h4>
                    <p className="text-muted-foreground">{selectedItem.servings}</p>
                  </div>
                )}

                {selectedItem.ingredients && (
                  <div>
                    <h4 className="font-semibold mb-2">Key Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map((i) => (
                        <Badge key={i} variant="outline">
                          {i}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.pairings && (
                  <div>
                    <h4 className="font-semibold mb-2">Perfect Pairings</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.pairings.map((p) => (
                        <Badge key={p} variant="secondary">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground italic">
                    Origin: {selectedItem.origin}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showFullMenu} onOpenChange={setShowFullMenu}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Traditional Catering Menu</DialogTitle>
            <DialogDescription>
              Our complete catering menu for events serving 10–200 people
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 relative w-full" style={{ minHeight: 400 }}>
            <Image
              src="/menu-original.png"
              alt="Jungle Flavorz Complete Catering Menu"
              width={1200}
              height={1600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            {selectedImage && (
              <div className="relative w-full h-[80vh]">
                <Image
                  src={selectedImage}
                  alt="Menu item detail"
                  fill
                  sizes="100vw"
                  className="object-contain rounded-lg"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function FeaturedShowcase({
  items,
  onSelect,
}: {
  items: MenuItem[];
  onSelect: (i: MenuItem) => void;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-7 mb-10">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onSelect(item)}
          className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] text-left"
        >
          <div className="relative h-80">
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h4 className="font-playfair text-2xl md:text-3xl font-bold mb-2">
                {item.name}
              </h4>
              <p className="text-sm opacity-90 mb-3 line-clamp-2">
                {item.description}
              </p>
              <Badge className="bg-rich-gold/30 text-white border-white/30 backdrop-blur-sm">
                {item.origin}
              </Badge>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function GridSection({
  items,
  onSelect,
}: {
  items: MenuItem[];
  onSelect: (i: MenuItem) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card
          key={item.name}
          className="cursor-pointer border-warm-brown/10 hover:border-rich-gold/40 hover:-translate-y-1 transition-all duration-300 group overflow-hidden bg-white"
          onClick={() => onSelect(item)}
        >
          <div className="relative h-52 overflow-hidden">
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {item.images.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                +{item.images.length - 1} more
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/90 text-warm-brown hover:bg-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="font-playfair text-xl group-hover:text-bronze transition-colors">
              {item.name}
            </CardTitle>
            <CardDescription className="text-base line-clamp-2">
              {item.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {item.vegetarian && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                  <Leaf className="w-3 h-3 mr-1" /> Vegetarian
                </Badge>
              )}
              {item.glutenFree && (
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  Gluten-Free
                </Badge>
              )}
            </div>
            <p className="text-xs text-warm-brown/55 mt-3 italic">
              {item.origin}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
