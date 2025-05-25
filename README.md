# Event Calendar

A modern, responsive event calendar built with Next.js, React, and Tailwind CSS. Create, manage, and organize your events with an intuitive drag-and-drop interface.

Link: https://event-calender-eight.vercel.app/

## ✨ Features

- **📅 Monthly Calendar View** - Clean, intuitive calendar interface
- **🎯 Event Management** - Create, edit, and delete events easily
- **🔄 Recurring Events** - Support for daily, weekly, and monthly recurring events
- **🎨 Color Coding** - Organize events with custom colors
- **🖱️ Drag & Drop** - Move events between dates effortlessly
- **🔍 Search Functionality** - Quickly find events by title or description
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **⏰ Time Management** - Set start and end times for events
- **🔔 Event Details** - Add descriptions and view comprehensive event information

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amandeep4567/event-calender.git
   cd event-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework for production
- **[React 19](https://reactjs.org/)** - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

## 📁 Project Structure

```
event-calendar/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   └── page.js              # Main page component
│   ├── components/
│   │   ├── Calendar/            # Calendar components
│   │   │   ├── Calendar.js
│   │   │   ├── CalendarDay.js
│   │   │   ├── CalendarGrid.js
│   │   │   ├── CalendarHeader.js
│   │   │   └── EventCard.js
│   │   ├── Forms/               # Form components
│   │   ├── Layout/              # Layout components
│   │   │   └── Header.js
│   │   ├── Models/              # Modal components
│   │   │   ├── ConfirmModal.js
│   │   │   └── EventModal.js
│   │   └── UI/                  # Reusable UI components
│   ├── context/
│   │   └── EventContext.js      # Global state management
│   ├── hooks/                   # Custom React hooks
│   └── utils/                   # Utility functions
│       ├── constants.js
│       ├── dateUtils.js
│       ├── dragDropUtils.js
│       └── eventUtils.js
└── package.json
```

## 🎯 How to Use

### Creating Events

1. **Quick Create**: Click the "Add Event" button in the header
2. **Date-specific**: Click on any calendar day to create an event for that date
3. Fill in the event details:
   - Title (required)
   - Description (optional)
   - Start and end times
   - Color coding
   - Recurrence settings

### Managing Events

- **View Details**: Click on any event card to see full details
- **Edit Events**: Use the edit button in the event modal
- **Delete Events**: Use the delete button with confirmation
- **Move Events**: Drag and drop events to different dates

### Recurring Events

Set up recurring events with options for:
- **Daily**: Every N days
- **Weekly**: Every N weeks, with specific day selection
- **Monthly**: Every N months on the same date

### Search and Filter

Use the search bar in the header to quickly find events by:
- Event title
- Event description

**⭐ If you found this project helpful, please give it a star on GitHub!**
