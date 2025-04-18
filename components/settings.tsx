"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Bell, Moon, Sun } from "lucide-react"

export default function SettingsPage() {
  const [technique, setTechnique] = useState("pomodoro")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-muted-foreground">john.doe@example.com</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Technique</CardTitle>
            <CardDescription>Choose your preferred productivity method</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={technique} onValueChange={setTechnique} className="space-y-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="pomodoro" id="pomodoro" />
                <div className="grid gap-1.5">
                  <Label htmlFor="pomodoro" className="font-medium">
                    Pomodoro
                  </Label>
                  <p className="text-sm text-muted-foreground">Work in 25-minute intervals with 5-minute breaks</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="flowmodoro" id="flowmodoro" />
                <div className="grid gap-1.5">
                  <Label htmlFor="flowmodoro" className="font-medium">
                    Flowmodoro
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Work until your flow breaks, then take a proportional break
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            {technique === "pomodoro" && (
              <div className="w-full space-y-4">
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="work-duration">Work Duration (minutes)</Label>
                    <Select defaultValue="25">
                      <SelectTrigger id="work-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="45">45</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                    <Select defaultValue="5">
                      <SelectTrigger id="break-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme-color">Theme Color</Label>
              <Select defaultValue="blue">
                <SelectTrigger id="theme-color">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="notifications">Enable Notifications</Label>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
            {notifications && (
              <div className="space-y-2 pt-2">
                <Label htmlFor="notification-sound">Notification Sound</Label>
                <Select defaultValue="chime">
                  <SelectTrigger id="notification-sound">
                    <SelectValue placeholder="Select sound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chime">Chime</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="ping">Ping</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions that affect your account</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive">Delete Account</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
