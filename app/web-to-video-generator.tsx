"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function WebToVideoGenerator() {
  const [url, setUrl] = useState("")
  const [textInput, setTextInput] = useState("")
  const [transitionEffect, setTransitionEffect] = useState("fade")
  const [imageFilter, setImageFilter] = useState("none")
  const [duration, setDuration] = useState(5)
  const [textOverlay, setTextOverlay] = useState("Slide {slide_number}")
  const [bgMusicVolume, setBgMusicVolume] = useState(0.3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Here you would call your backend API to generate the video
    // For now, we'll simulate a delay and then set a dummy video URL
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setGeneratedVideoUrl("https://example.com/generated-video.mp4")
    setIsGenerating(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enhanced Website to Video Generator</h1>
      <Tabs defaultValue="url">
        <TabsList>
          <TabsTrigger value="url">URL Input</TabsTrigger>
          <TabsTrigger value="text">Direct Text Input</TabsTrigger>
        </TabsList>
        <TabsContent value="url">
          <Input placeholder="Enter website URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        </TabsContent>
        <TabsContent value="text">
          <Textarea
            placeholder="Paste website content directly"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </TabsContent>
      </Tabs>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Customization Options</CardTitle>
          <CardDescription>Customize your video generation settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Transition Effect</label>
              <Select value={transitionEffect} onValueChange={setTransitionEffect}>
                <option value="fade">Fade</option>
                <option value="slide_left">Slide Left</option>
                <option value="slide_right">Slide Right</option>
                <option value="zoom">Zoom</option>
                <option value="rotate">Rotate</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Image Filter</label>
              <Select value={imageFilter} onValueChange={setImageFilter}>
                <option value="none">None</option>
                <option value="grayscale">Grayscale</option>
                <option value="sepia">Sepia</option>
                <option value="blur">Blur</option>
                <option value="sharpen">Sharpen</option>
                <option value="edge_enhance">Edge Enhance</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Seconds per Slide</label>
              <Slider min={3} max={10} step={1} value={[duration]} onValueChange={(value) => setDuration(value[0])} />
              <span>{duration} seconds</span>
            </div>
            <div>
              <label className="block mb-2">Text Overlay Template</label>
              <Input
                value={textOverlay}
                onChange={(e) => setTextOverlay(e.target.value)}
                placeholder="Use {slide_number} for automatic numbering"
              />
            </div>
            <div>
              <label className="block mb-2">Background Music Volume</label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[bgMusicVolume]}
                onValueChange={(value) => setBgMusicVolume(value[0])}
              />
              <span>{bgMusicVolume.toFixed(1)}</span>
            </div>
            <div>
              <label className="block mb-2">Background Music</label>
              <Input type="file" accept=".mp3,.wav" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Video"}
          </Button>
        </CardFooter>
      </Card>
      {generatedVideoUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Generated Video</h2>
          <video controls src={generatedVideoUrl} className="w-full" />
          <Button className="mt-2" onClick={() => window.open(generatedVideoUrl, "_blank")}>
            Download Video
          </Button>
        </div>
      )}
    </div>
  )
}

