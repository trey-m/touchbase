import { Calendar, CheckSquare, Home, Settings, HelpCircle } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/client/ui/sidebar';
import { Input } from '@/client/ui/input';
import { Switch } from '@/client/ui/switch';
import { Label } from '@/client/ui/label';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center p-4'>
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white'>T</div>
          <span className='text-lg font-semibold'>Touchbase</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <div className='px-4 py-2'>
          <Input placeholder='Search' className='h-9' />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className='h-4 w-4' />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Calendar className='h-4 w-4' />
                  <span>Calendar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CheckSquare className='h-4 w-4' />
                  <span>To-do list</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className='flex items-center space-x-2 px-2 py-1'>
              <div className='flex space-x-1'>
                <div className='h-4 w-4 rounded-full bg-blue-500 ring-2 ring-offset-2'></div>
                <div className='h-4 w-4 rounded-full bg-green-500'></div>
                <div className='h-4 w-4 rounded-full bg-orange-500'></div>
                <div className='h-4 w-4 rounded-full bg-red-500'></div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className='flex items-center justify-between px-2 py-1'>
              <Label htmlFor='dark-mode' className='text-sm'>
                Dark mode
              </Label>
              <Switch id='dark-mode' />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className='h-4 w-4' />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <HelpCircle className='h-4 w-4' />
                  <span>Help center</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
