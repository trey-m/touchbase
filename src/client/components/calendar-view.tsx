import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

import { cn } from '@/client/lib/utils';
import { Button } from '@/client/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/client/ui/dropdown-menu';

// Sample events data
const events = [
  {
    id: 1,
    title: "Carl's birthday",
    start: new Date(2025, 4, 5, 0, 0),
    end: new Date(2025, 4, 5, 23, 59),
    allDay: true,
    color: 'bg-green-100 border-green-200 text-green-700',
  },
  {
    id: 2,
    title: 'Job interview',
    start: new Date(2025, 4, 5, 10, 0),
    end: new Date(2025, 4, 5, 11, 0),
    allDay: true,
    color: 'bg-orange-100 border-orange-200 text-orange-700',
  },
  {
    id: 3,
    title: 'The walking dead',
    start: new Date(2025, 4, 5, 9, 0),
    end: new Date(2025, 4, 5, 10, 0),
    color: 'bg-orange-100 border-orange-200 text-orange-700',
  },
  {
    id: 4,
    title: 'Sales meeting',
    start: new Date(2025, 4, 5, 9, 0),
    end: new Date(2025, 4, 5, 10, 0),
    color: 'bg-yellow-100 border-yellow-200 text-yellow-700',
  },
  {
    id: 5,
    title: 'Initial briefing',
    start: new Date(2025, 4, 5, 10, 30),
    end: new Date(2025, 4, 5, 11, 0),
    color: 'bg-blue-100 border-blue-200 text-blue-700',
  },
  {
    id: 6,
    title: 'Brainstorming',
    start: new Date(2025, 4, 5, 10, 45),
    end: new Date(2025, 4, 5, 11, 30),
    color: 'bg-blue-100 border-blue-200 text-blue-700',
  },
  {
    id: 7,
    title: 'Reporting',
    start: new Date(2025, 4, 5, 11, 0),
    end: new Date(2025, 4, 5, 11, 30),
    color: 'bg-green-100 border-green-200 text-green-700',
  },
  {
    id: 8,
    title: 'Lunch break',
    start: new Date(2025, 4, 5, 11, 30),
    end: new Date(2025, 4, 5, 12, 30),
    color: 'bg-red-100 border-red-200 text-red-700',
  },
];

interface CalendarViewProps {
  currentDate: Date;
}

export function CalendarView({ currentDate }: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Generate week days starting from Sunday
  const startDate = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  // Generate time slots from 12 AM to 11 PM
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  // Filter events for the current week
  const currentEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    return weekDays.some((day) => isSameDay(day, eventDate));
  });

  // Get events for a specific day and time
  const getEventsForDayAndTime = (day: Date, hour: number) => {
    return currentEvents.filter((event) => {
      const eventDate = new Date(event.start);
      return isSameDay(day, eventDate) && (event.allDay || eventDate.getHours() === hour);
    });
  };

  // Format time (12-hour format)
  const formatTime = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      {/* Week days header */}
      <div className='sticky top-0 z-10 flex border-b bg-white'>
        <div className='w-20 shrink-0 border-r bg-white'></div>
        {weekDays.map((day, index) => {
          const isToday = isSameDay(day, new Date());
          return (
            <div
              key={index}
              className={cn('flex flex-1 flex-col items-center border-r p-2', isToday && 'bg-blue-100 rounded-t-md')}
            >
              <div className={cn('text-sm font-medium', isToday ? 'text-blue-700' : 'text-gray-500')}>
                {format(day, 'EEE')}
              </div>
              <div className={cn('text-lg font-semibold', isToday && 'text-blue-700')}>{format(day, 'd')}</div>
              {isToday && <div className='mt-1 h-1 w-6 rounded-full bg-blue-500'></div>}
            </div>
          );
        })}
      </div>

      {/* Calendar grid */}
      <div className='flex flex-1 flex-col'>
        {/* All day events */}
        <div className='flex border-b'>
          <div className='flex w-20 shrink-0 items-center border-r px-2 py-4 text-xs font-medium'>All Day</div>
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className='flex-1 border-r p-1'>
              {getEventsForDayAndTime(day, 0)
                .filter((event) => event.allDay)
                .map((event) => (
                  <div key={event.id} className={cn('mb-1 rounded-md border p-2 text-xs', event.color)}>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>{event.title}</span>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-5 w-5'
                        onClick={() => setSelectedEvent(event.id === selectedEvent ? null : event.id)}
                      >
                        <MoreHorizontal className='h-3 w-3' />
                      </Button>
                    </div>
                    <div className='text-xs opacity-75'>All day</div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Time slots */}
        {timeSlots.map((hour) => (
          <div key={hour} className='flex min-h-[100px] border-b'>
            <div className='flex w-20 shrink-0 items-start border-r px-2 py-1 text-xs font-medium'>
              {formatTime(hour)}
            </div>
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className='relative flex-1 border-r'>
                {getEventsForDayAndTime(day, hour)
                  .filter((event) => !event.allDay)
                  .map((event) => {
                    const startHour = event.start.getHours();
                    const startMinute = event.start.getMinutes();
                    const endHour = event.end.getHours();
                    const endMinute = event.end.getMinutes();

                    // Only show events that start in this hour slot
                    if (startHour !== hour) return null;

                    return (
                      <div
                        key={event.id}
                        className={cn(
                          'absolute left-0 right-0 m-1 rounded-md border p-2 text-xs',
                          event.color,
                          selectedEvent === event.id ? 'ring-2 ring-blue-500' : ''
                        )}
                        style={{
                          top: `${(startMinute / 60) * 100}%`,
                          height: `${(((endHour - startHour) * 60 + (endMinute - startMinute)) / 60) * 100}%`,
                          minHeight: '30px',
                          zIndex: selectedEvent === event.id ? 10 : 1,
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <span className='font-medium'>{event.title}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-5 w-5'
                                onClick={() => setSelectedEvent(event.id === selectedEvent ? null : event.id)}
                              >
                                <MoreHorizontal className='h-3 w-3' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-40'>
                              <DropdownMenuItem>Set reminder</DropdownMenuItem>
                              <DropdownMenuItem>Minimize</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem className='text-red-500'>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className='text-xs opacity-75'>
                          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
