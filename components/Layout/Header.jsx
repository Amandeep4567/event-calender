import React, { useState } from 'react';
import { Search, Plus, Calendar } from 'lucide-react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import EventModal from '../Models/EventModel';
import { useEventContext } from '../../context/EventContext';

const Header = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const { searchTerm, setSearchTerm } = useEventContext();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Event Calendar</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button
                onClick={() => setShowEventModal(true)}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {showEventModal && (
        <EventModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          selectedDate={new Date()}
        />
      )}
    </>
  );
};

export default Header;
