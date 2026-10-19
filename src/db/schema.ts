import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  genre: text("genre").notNull(),
  description: text("description").notNull(),
  summary: text("summary").notNull(),
  price: integer("price").notNull(),
  formattedPrice: text("formatted_price").notNull(),
  coverImage: text("cover_image").notNull(),
  coverColor: text("cover_color").notNull(),
  coverSecondaryColor: text("cover_secondary_color").notNull(),
  pages: integer("pages").notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  year: integer("year").notNull(),
  isbn: text("isbn").notNull(),
  isFeatured: boolean("is_featured").default(false),
  badge: text("badge"),
  publisher: text("publisher").default("Kitob Top Nashriyoti"),
  language: text("language").default("O'zbekcha"),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
