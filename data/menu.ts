// Single source of truth for the menu. Image filenames here match the
// properly-named files in /public/menu (Beef Kabob.jpeg, Jollof Rice.jpeg,
// etc.), so each dish renders with the correct photo.

export interface MenuItem {
  name: string;
  description: string;
  vegetarian?: boolean;
  glutenFree?: boolean;
  servings?: string;
  pairings?: string[];
  ingredients?: string[];
  origin: string;
  images: string[];
}

export const menuData: Record<"appetizers" | "mains" | "sides", MenuItem[]> = {
  appetizers: [
    {
      name: "Beef Sambussa",
      description:
        "Crispy golden pastries filled with seasoned ground beef, onions, and warming spices. Served with our signature dipping sauce.",
      servings: "12-15 pieces per order",
      ingredients: [
        "Ground beef",
        "Onions",
        "Garlic",
        "Cumin",
        "Curry spices",
        "Phyllo dough",
      ],
      pairings: ["Tamarind sauce", "Fresh mint chutney"],
      origin: "East African tradition",
      images: [
        "/menu/Beef Sambussa.jpeg",
        "/menu/Sambussa Pic.jpeg",
        "/menu/Sambussa Pic (2).jpeg",
      ],
    },
    {
      name: "Chapati",
      description:
        "Soft, flaky East African flatbreads, hand-rolled and griddled until golden. Perfect for scooping or wrapping.",
      vegetarian: true,
      servings: "8-10 pieces per order",
      ingredients: ["Wheat flour", "Water", "Salt", "Oil"],
      pairings: ["Stews", "Curries", "Coconut chutney"],
      origin: "Kenyan specialty",
      images: ["/menu/Chapati.jpeg"],
    },
    {
      name: "Sweet Plantains",
      description:
        "Ripe plantains caramelized to perfection — sweet, tender, and finished with our jungle dipping sauce.",
      vegetarian: true,
      glutenFree: true,
      servings: "15-20 pieces per order",
      ingredients: ["Ripe plantains", "Vegetable oil", "Jungle sauce blend"],
      pairings: ["Jungle dipping sauce", "Rice and beans"],
      origin: "Pan-African favorite",
      images: ["/menu/Sweet Plantains.jpeg"],
    },
    {
      name: "Beignets",
      description:
        "Light, airy pastries dusted with powdered sugar. A delicate treat perfect for sharing.",
      vegetarian: true,
      servings: "12-15 pieces per order",
      ingredients: [
        "Flour",
        "Yeast",
        "Sugar",
        "Milk",
        "Butter",
        "Powdered sugar",
      ],
      pairings: ["Coffee", "Tea", "Honey"],
      origin: "French-African fusion",
      images: ["/menu/Beignets pic.jpeg"],
    },
    {
      name: "Sweet Mandazi",
      description:
        "Lightly sweetened East African doughnuts with a hint of cardamom — pillowy soft and irresistible.",
      vegetarian: true,
      servings: "12-15 pieces per order",
      ingredients: [
        "Flour",
        "Coconut milk",
        "Cardamom",
        "Sugar",
        "Yeast",
      ],
      pairings: ["Chai tea", "Coffee"],
      origin: "Swahili coast classic",
      images: ["/menu/Sweet Mandazi.jpeg"],
    },
  ],

  mains: [
    {
      name: "Jollof Rice",
      description:
        "Iconic West African rice slow-cooked in a rich tomato and pepper base. Served with grilled chicken or fish.",
      glutenFree: true,
      servings: "Serves 8-10 people",
      ingredients: [
        "Rice",
        "Tomatoes",
        "Peppers",
        "Onions",
        "Spices",
        "Grilled chicken or fish",
      ],
      pairings: ["Grilled chicken", "Grilled fish", "Plantains"],
      origin: "West African classic",
      images: ["/menu/Jollof Rice.jpeg", "/menu/jollof_rice.jpg"],
    },
    {
      name: "Pilau",
      description:
        "Fragrant Swahili-style rice infused with cardamom, cumin, and cinnamon, paired with your choice of grilled chicken or beef.",
      glutenFree: true,
      servings: "Serves 8-10 people",
      ingredients: [
        "Basmati rice",
        "Cardamom",
        "Cinnamon",
        "Cloves",
        "Cumin",
        "Meat of choice",
      ],
      pairings: ["Grilled meats", "Kachumbari salad"],
      origin: "Swahili tradition",
      images: ["/menu/Pilau.jpeg"],
    },
    {
      name: "Fried Rice",
      description:
        "Flavorful stir-fried rice with seasonal vegetables and aromatic East African spices.",
      vegetarian: true,
      servings: "Serves 8-10 people",
      ingredients: [
        "Rice",
        "Mixed vegetables",
        "Soy sauce",
        "Garlic",
        "Ginger",
      ],
      pairings: ["Spring rolls", "Grilled proteins"],
      origin: "East African fusion",
      images: ["/menu/Fried Rice.jpeg"],
    },
    {
      name: "Jungle Chicken",
      description:
        "Grilled chicken marinated overnight in our signature Jungle sauce — herbs, citrus, and warm spices.",
      glutenFree: true,
      servings: "8-10 pieces per order",
      ingredients: ["Chicken", "Jungle sauce", "Herbs", "Spices"],
      pairings: ["Rice dishes", "Ugali", "Salads"],
      origin: "House specialty",
      images: ["/menu/Jungle Chicken.jpeg"],
    },
    {
      name: "Marinated Jungle Beef",
      description:
        "Tender grilled beef slow-marinated with traditional Burundian spices for deep, savory flavor.",
      glutenFree: true,
      servings: "Serves 8-10 people",
      ingredients: [
        "Beef",
        "Traditional spices",
        "Garlic",
        "Ginger",
        "Herbs",
      ],
      pairings: ["Ugali", "Rice", "Vegetable sides"],
      origin: "Burundian tradition",
      images: ["/menu/Marinated Jungle Beef.jpeg"],
    },
    {
      name: "Beef Kabob",
      description:
        "Tender skewers of marinated beef, charred over open flame and served with fresh salad.",
      glutenFree: true,
      servings: "10-12 skewers per order",
      ingredients: ["Beef", "Peppers", "Onions", "Marinade"],
      pairings: ["Fresh salad", "Rice", "Flatbreads"],
      origin: "Pan-African favorite",
      images: ["/menu/Beef Kabob.jpeg"],
    },
    {
      name: "Chicken Kabob",
      description:
        "Juicy chicken skewers flame-grilled to perfection, served with a crisp side salad.",
      glutenFree: true,
      servings: "10-12 skewers per order",
      ingredients: ["Chicken", "Peppers", "Onions", "Marinade"],
      pairings: ["Fresh salad", "Rice", "Flatbreads"],
      origin: "Pan-African favorite",
      images: ["/menu/Chicken Kabob.jpeg", "/menu/chicken_kabob.jpg"],
    },
    {
      name: "Fumbwa",
      description:
        "Authentic Congolese dish made with rare forest leaves, simmered in red palm oil and peanut butter.",
      vegetarian: true,
      servings: "Serves 8-10 people",
      ingredients: [
        "Forest leaves",
        "Red palm oil",
        "Peanut butter",
        "Onions",
        "Garlic",
      ],
      pairings: ["White rice", "Plantains", "Cassava"],
      origin: "Congolese delicacy",
      images: ["/menu/Fumbwa.jpeg"],
    },
    {
      name: "Cassava Leaves (Pondu / Sombe)",
      description:
        "Traditional cassava leaves stewed with palm oil and aromatics, served with white rice and fried plantains.",
      vegetarian: true,
      servings: "Serves 8-10 people",
      ingredients: ["Cassava leaves", "Palm oil", "Garlic", "Onions"],
      pairings: ["White rice", "Fried plantains"],
      origin: "Central African classic",
      images: ["/menu/pondu.png"],
    },
    {
      name: "Pinto Beans",
      description:
        "Savory slow-simmered beans with onions, tomatoes, and East African spices. Comfort in a bowl.",
      vegetarian: true,
      glutenFree: true,
      servings: "Serves 8-10 people",
      ingredients: ["Pinto beans", "Onions", "Tomatoes", "Spices"],
      pairings: ["White rice", "Fried plantains"],
      origin: "East African comfort food",
      images: ["/menu/Beans.jpeg"],
    },
  ],

  sides: [
    {
      name: "Cabbage Crunch Salad",
      description:
        "Crisp shredded cabbage, carrots, and herbs tossed in a bright, zesty dressing.",
      vegetarian: true,
      glutenFree: true,
      servings: "Serves 8-10 people",
      ingredients: ["Cabbage", "Carrots", "Herbs", "Citrus dressing"],
      pairings: ["Kabobs", "Grilled meats"],
      origin: "Fresh house side",
      images: ["/menu/Cabbage Crunch Salad.jpeg"],
    },
    {
      name: "Mixed Green Salad",
      description:
        "Garden-fresh greens, tomatoes, and cucumbers with a light vinaigrette.",
      vegetarian: true,
      glutenFree: true,
      servings: "Serves 8-10 people",
      ingredients: ["Mixed greens", "Tomato", "Cucumber", "Vinaigrette"],
      pairings: ["Any main"],
      origin: "Fresh house side",
      images: ["/menu/Mixed Green Salad.jpeg"],
    },
  ],
};
