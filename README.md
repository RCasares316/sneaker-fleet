# SneakerFleet

For this project, I built a full-stack web application that allows users to **showcase their sneaker collection**, browse other users’ collections, and mark sneakers as **for sale** with pricing information. The app focuses on clean presentation, user ownership of data, and an intuitive way to display sneaker details such as brand, body style, variant, release year, and color pattern.

SneakerFleet combines authentication, database relationships, server-side rendering, and form validation to create a polished collection management experience.

[Sneaker Fleet]()

---

## How to Use

### Basic Flow

- A user creates an account and logs in
- The user can add sneakers to their personal collection

Each sneaker includes:

- Brand
- Body Style
- Variant (optional)
- Release Year
- Color Pattern
- For Sale status
- Price (if for sale)

Users can:

- View their own collection
- View other users’ collections
- Edit sneakers they own
- Delete sneakers they own

---

## Viewing Collections

- The main collection page shows all sneakers owned by the logged-in user
- User profile pages display sneakers belonging to that specific user
- Sneakers marked **For Sale** can be listed with a price for inquiries

---

## Technologies Used

- **HTML** – Structure of pages and forms using EJS templates  
- **CSS** – Layout, styling, and responsive design  
- **JavaScript (Node.js + Express)** – Server logic, routing, and controllers  
- **MongoDB + Mongoose** – Database modeling and relationships  
- **EJS** – Server-side rendering of dynamic data  
- **Express Session** – User authentication and ownership control

---


## File Overview

### `collection.js` (Model)

Defines the sneaker schema:

- Required sneaker attributes
- Optional variant field
- `owner` field referencing the User model
- `forSale` and `price` logic

---

### `collectionController.js`

Handles all logic related to sneakers.

**Core Responsibilities:**

- Rendering user collection
- Creating new sneakers
- Handling validation errors
- Editing sneakers
- Deleting sneakers securely
- Ensuring users can only modify their own sneakers

---

### Collection Routes

- `GET /collection` → Show user’s sneakers
- `GET /collection/new` → Form to add sneaker
- `POST /collection` → Create sneaker
- `GET /collection/:id/edit` → Edit form
- `PUT /collection/:id` → Update sneaker
- `DELETE /collection/:id` → Remove sneaker

---

### Views

EJS templates dynamically render sneaker data:

- Forms retain user input after validation errors
- Error messages are displayed when required fields are missing
- Navigation is shared via partials
- Proper static file linking for CSS across all routes

---

## Key Design Decisions

### User Ownership Enforcement

Every sneaker has an `owner` field. Queries always filter by `owner` to ensure users can only view and modify their own data.

### Server-Side Validation with Feedback

Mongoose handles required fields. Validation errors are caught and displayed back to the user without losing form input.

### MVC Structure

Separating models, controllers, and routes keeps the project organized and easier to scale.

### Static Asset Handling

Using `express.static` ensures CSS and assets load correctly across nested routes.

---

## Future Improvements

- Image uploads for each sneaker
- Search and filtering across collections
- Messaging system for purchase inquiries
- Pagination for large collections
- Public marketplace view for all sneakers marked for sale
- User profile customization

---

## Author

**Richard Casares**

GitHub

---

## Reflections

This project strengthened my understanding of **full-stack application flow**, especially how data moves from forms → controllers → database → views. The most challenging parts were handling validation errors gracefully, maintaining user ownership security, and correctly structuring the MVC pattern. Solving these issues helped build a much deeper understanding of how Express, EJS, and MongoDB work together in a real application.
