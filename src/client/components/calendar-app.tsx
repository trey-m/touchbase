import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

import { AppSidebar } from './app-sidebar';
import { CalendarView } from './calendar-view';
import { Button } from '@/client/ui/button';
import { SidebarInset, SidebarProvider } from '@/client/ui/sidebar';

export function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <div className='flex h-full flex-col'>
          <header className='flex h-16 items-center justify-between border-b px-4'>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='icon' onClick={prevMonth}>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='icon' onClick={nextMonth}>
                <ChevronRight className='h-4 w-4' />
              </Button>
              <h1 className='ml-2 text-xl font-semibold'>{format(currentDate, 'MMMM yyyy')}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <Button>
                <Plus className='mr-2 h-4 w-4' />
                Create Event
              </Button>
            </div>
          </header>
          <CalendarView currentDate={currentDate} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
