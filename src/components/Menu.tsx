import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Flame, Leaf, Search, Eye, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import menuImage from "@/assets/menu-original.png";

interface MenuItem {
  name: string;
  description: string;
  spiceLevel?: number;
  vegetarian?: boolean;
  glutenFree?: boolean;
  servings?: string;
  pairings?: string[];
  ingredients?: string[];
  origin: string;
  images?: string[];
}

export const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const menuData: Record<string, MenuItem[]> = {
    appetizers: [
      {
        name: "Beef Samosas",
        description: "Crispy pastries filled with spiced ground beef, served with tangy tamarind sauce",
        spiceLevel: 2,
        servings: "12-15 pieces per order",
        ingredients: ["Ground beef", "Onions", "Garlic", "Cumin", "Curry spices", "Phyllo dough"],
        pairings: ["Tamarind sauce", "Fresh mint chutney"],
        origin: "East African tradition",
        images: ["/menu/Sambussa Pic.jpeg", "/menu/sambussa.jpg", "/menu/wrapped sambussa.jpg"],
      },
      {
        name: "Chapati",
        description: "Soft, unleavened flatbreads served with our signature spicy dipping sauce",
        vegetarian: true,
        spiceLevel: 1,
        servings: "8-10 pieces per order",
        ingredients: ["Wheat flour", "Water", "Salt", "Oil"],
        pairings: ["Spicy dipping sauce", "Coconut chutney"],
        origin: "Kenyan specialty",
        images: ["/menu/IMG_0237.PNG", "/menu/IMG_0246.JPG"],
      },
      {
        name: "Plantains with Jungle Dipping Sauce",
        description: "Fried plantains served with our signature jungle dipping sauce",
        vegetarian: true,
        glutenFree: true,
        spiceLevel: 2,
        servings: "15-20 pieces per order",
        ingredients: ["Ripe plantains", "Vegetable oil", "Jungle sauce blend"],
        pairings: ["Jungle dipping sauce"],
        origin: "Tanzanian inspired",
        images: ["/menu/pnatain.jpg", "/menu/noname (21).jpg"],
      },
      {
        name: "Beignets",
        description: "Light, fluffy pastries dusted with powdered sugar, perfect for sharing",
        vegetarian: true,
        spiceLevel: 0,
        servings: "12-15 pieces per order",
        ingredients: ["Flour", "Yeast", "Sugar", "Milk", "Butter", "Powdered sugar"],
        pairings: ["Coffee", "Tea", "Honey"],
        origin: "French-African fusion",
        images: ["/menu/Beignets pic.jpeg"],
      },
    ],
    mains: [
      {
        name: "Jollof Rice",
        description: "Spiced rice cooked with tomatoes and peppers, served with grilled chicken or fish",
        spiceLevel: 2,
        glutenFree: true,
        servings: "Serves 8-10 people",
        ingredients: ["Rice", "Tomatoes", "Peppers", "Onions", "Spices", "Grilled chicken or fish"],
        pairings: ["Grilled chicken", "Grilled fish", "Plantains"],
        origin: "West African classic",
        images: ["/menu/jollof_rice.jpg", "/menu/rice.jpg"],
      },
      {
        name: "Pilau",
        description: "Fragrant rice cooked with aromatic spices, served with your choice of grilled chicken or beef",
        spiceLevel: 2,
        glutenFree: true,
        servings: "Serves 8-10 people",
        ingredients: ["Basmati rice", "Cardamom", "Cinnamon", "Cloves", "Cumin", "Meat of choice"],
        pairings: ["Grilled meats", "Kachumbari salad"],
        origin: "Swahili tradition",
        images: ["/menu/rice and beef.jpg", "/menu/sambussa_2.jpg"],
      },
      {
        name: "Fried Rice",
        description: "Flavorful stir-fried rice with vegetables and aromatic spices",
        vegetarian: true,
        spiceLevel: 1,
        servings: "Serves 8-10 people",
        ingredients: ["Rice", "Mixed vegetables", "Soy sauce", "Garlic", "Ginger"],
        pairings: ["Spring rolls", "Grilled proteins"],
        origin: "East African fusion",
        images: ["/menu/delicacies include sambussa, fried rice.jpg", "/menu/noname (35).jpg"],
      },
      {
        name: "Jungle Chicken",
        description: "Grilled chicken marinated in our signature Jungle sauce blend",
        spiceLevel: 3,
        glutenFree: true,
        servings: "8-10 pieces per order",
        ingredients: ["Chicken", "Jungle sauce", "Herbs", "Spices"],
        pairings: ["Rice dishes", "Ugali", "Salads"],
        origin: "House specialty",
        images: ["/menu/white_rice and veggies.jpg", "/menu/noname (22).jpg"],
      },
      {
        name: "East African Marinated Beef",
        description: "Tender grilled beef marinated with traditional East African spices for deep, savory flavor",
        spiceLevel: 3,
        glutenFree: true,
        servings: "Serves 8-10 people",
        ingredients: ["Beef", "Traditional spices", "Garlic", "Ginger", "Herbs"],
        pairings: ["Ugali", "Rice", "Vegetable sides"],
        origin: "Burundian tradition",
        images: ["/menu/at_an_event.jpg", "/menu/chopped_onions and tomato.jpg"],
      },
      {
        name: "Beef or Chicken Kabob",
        description: "Skewered and grilled beef or chicken served with a choice of salad",
        spiceLevel: 2,
        glutenFree: true,
        servings: "10-12 skewers per order",
        ingredients: ["Meat of choice", "Peppers", "Onions", "Marinade"],
        pairings: ["Fresh salad", "Rice", "Flatbreads"],
        origin: "Pan-African favorite",
        images: ["/menu/chicken_kabob.jpg", "/menu/white_rice and chicken_kabob.jpg"],
      },
      {
        name: "Fumbwa",
        description: "Authentic dish made with rare forest leaves imported from East Africa, simmered in red oil and peanut butter",
        vegetarian: true,
        spiceLevel: 2,
        servings: "Serves 8-10 people",
        ingredients: ["Forest leaves", "Red oil", "Peanut butter", "Onions", "Garlic"],
        pairings: ["White rice", "Plantains", "Cassava"],
        origin: "Congolese delicacy",
        images: ["/menu/white_rice.jpg", "/menu/noname (28).jpg"],
      },
      {
        name: "Cassava Leaves (Pondu or Sombe)",
        description: "Traditional cassava leaves served with white rice and fried plantains",
        vegetarian: true,
        spiceLevel: 1,
        servings: "Serves 8-10 people",
        ingredients: ["Cassava leaves", "Palm oil", "Garlic", "Onions"],
        pairings: ["White rice", "Fried plantains"],
        origin: "Central African classic",
        images: ["/menu/white_rice and veggies_2.jpg", "/menu/noname (30).jpg"],
      },
      {
        name: "Pinto Beans",
        description: "Savory beans served with white rice and fried plantains",
        vegetarian: true,
        glutenFree: true,
        spiceLevel: 1,
        servings: "Serves 8-10 people",
        ingredients: ["Pinto beans", "Onions", "Tomatoes", "Spices"],
        pairings: ["White rice", "Fried plantains"],
        origin: "East African comfort food",
        images: ["/menu/noname (31).jpg", "/menu/noname (32).jpg"],
      },
    ],
  };

  const filterMenuItems = (items: MenuItem[]) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderSpiceLevel = (level?: number) => {
    if (!level) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <Flame
            key={i}
            className={`w-4 h-4 ${i < level ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="section-padding bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-dancing text-2xl mb-2">Our Menu</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Authentic East African Flavors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each dish is crafted with authentic ingredients and traditional recipes. Complimentary spicy sauce available on the side for those who love extra heat!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>
        </div>

        {/* Interactive Menu Tabs */}
        <Tabs defaultValue="mains" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-auto p-1">
            <TabsTrigger value="mains" className="text-base py-3">Main Dishes</TabsTrigger>
            <TabsTrigger value="appetizers" className="text-base py-3">Appetizers</TabsTrigger>
          </TabsList>

          <TabsContent value="mains" className="space-y-8">
            {/* Menu Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <div className="text-2xl font-bold text-primary">{menuData.mains.length}</div>
                <div className="text-sm text-muted-foreground">Main Dishes</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl">
                <div className="text-2xl font-bold text-green-600">
                  {menuData.mains.filter(item => item.vegetarian).length}
                </div>
                <div className="text-sm text-muted-foreground">Vegetarian</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">
                  {menuData.mains.filter(item => item.spiceLevel && item.spiceLevel >= 3).length}
                </div>
                <div className="text-sm text-muted-foreground">Spicy Dishes</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">
                  {menuData.mains.filter(item => item.glutenFree).length}
                </div>
                <div className="text-sm text-muted-foreground">Gluten-Free</div>
              </div>
            </div>

            {/* Featured Main Dish Showcase */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-8 text-primary">🍽️ Signature Main Dishes</h3>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Featured Dish 1 */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                  onClick={() => setSelectedItem(menuData.mains[0])}
                >
                  <div className="relative h-80">
                    <img 
                      src={menuData.mains[0].images?.[0]} 
                      alt={menuData.mains[0].name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h4 className="text-2xl font-bold mb-2">{menuData.mains[0].name}</h4>
                      <p className="text-sm opacity-90 mb-3">{menuData.mains[0].description}</p>
                      <div className="flex items-center gap-3">
                        {renderSpiceLevel(menuData.mains[0].spiceLevel)}
                        <Badge className="bg-primary/20 text-white border-white/30">
                          {menuData.mains[0].origin}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Dish 2 */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                  onClick={() => setSelectedItem(menuData.mains[3])}
                >
                  <div className="relative h-80">
                    <img 
                      src={menuData.mains[3].images?.[0]} 
                      alt={menuData.mains[3].name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h4 className="text-2xl font-bold mb-2">{menuData.mains[3].name}</h4>
                      <p className="text-sm opacity-90 mb-3">{menuData.mains[3].description}</p>
                      <div className="flex items-center gap-3">
                        {renderSpiceLevel(menuData.mains[3].spiceLevel)}
                        <Badge className="bg-primary/20 text-white border-white/30">
                          House Specialty
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Main Dishes Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">All Main Dishes</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterMenuItems(menuData.mains).map((item, index) => (
                <Card 
                  key={index}
                  className="hover-lift cursor-pointer hover:border-primary/30 transition-all duration-300 group overflow-hidden relative"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.images && item.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                          +{item.images.length - 1} more
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="bg-white/90 text-black hover:bg-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Quick View
                        </Button>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </CardTitle>
                      {renderSpiceLevel(item.spiceLevel)}
                    </div>
                    <CardDescription className="text-base line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {item.vegetarian && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                          <Leaf className="w-3 h-3 mr-1" /> Vegetarian
                        </Badge>
                      )}
                      {item.glutenFree && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                          Gluten-Free
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">{item.origin}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            </div>
          </TabsContent>

          <TabsContent value="appetizers" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterMenuItems(menuData.appetizers).map((item, index) => (
                <Card 
                  key={index}
                  className="hover-lift cursor-pointer hover:border-primary/30 transition-all duration-300 group overflow-hidden"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.images && item.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                          +{item.images.length - 1} more
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </CardTitle>
                      {renderSpiceLevel(item.spiceLevel)}
                    </div>
                    <CardDescription className="text-base line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {item.vegetarian && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                          <Leaf className="w-3 h-3 mr-1" /> Vegetarian
                        </Badge>
                      )}
                      {item.glutenFree && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                          Gluten-Free
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">{item.origin}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Full Menu PDF View */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowFullMenu(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-medium"
          >
            View Full Traditional Menu
          </button>
        </div>
      </div>

      {/* Item Detail Modal */}
      <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between mb-2">
                  <DialogTitle className="text-3xl">{selectedItem.name}</DialogTitle>
                  {renderSpiceLevel(selectedItem.spiceLevel)}
                </div>
                <DialogDescription className="text-base">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              {/* Image Gallery */}
              {selectedItem.images && selectedItem.images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img 
                      src={selectedItem.images[0]} 
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedItem.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedItem.images.slice(1).map((image, idx) => (
                        <div 
                          key={idx}
                          className="relative h-16 rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(image)}
                        >
                          <img 
                            src={image} 
                            alt={`${selectedItem.name} ${idx + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-4 pt-4">
                <div className="flex flex-wrap gap-2">
                  {selectedItem.vegetarian && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <Leaf className="w-3 h-3 mr-1" /> Vegetarian
                    </Badge>
                  )}
                  {selectedItem.glutenFree && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Gluten-Free
                    </Badge>
                  )}
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
                      {selectedItem.ingredients.map((ingredient, idx) => (
                        <Badge key={idx} variant="outline">{ingredient}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.pairings && (
                  <div>
                    <h4 className="font-semibold mb-2">Perfect Pairings</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.pairings.map((pairing, idx) => (
                        <Badge key={idx} variant="secondary">{pairing}</Badge>
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

      {/* Full Menu Image Modal */}
      <Dialog open={showFullMenu} onOpenChange={setShowFullMenu}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Traditional Catering Menu</DialogTitle>
            <DialogDescription>
              Our complete catering menu for events serving 10-200 people
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <img 
              src={menuImage} 
              alt="Jungle Flavorz Complete Catering Menu" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
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
              <img 
                src={selectedImage} 
                alt="Menu item detail"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
