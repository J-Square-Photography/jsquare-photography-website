'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'

const THEME_PRESETS = [
  { id: 'minimal', label: 'Minimal', colors: { bg: '#ffffff', text: '#000000' } },
  { id: 'dark', label: 'Dark', colors: { bg: '#0a0a0a', text: '#ffffff' } },
  { id: 'warm', label: 'Warm', colors: { bg: '#faf5f0', text: '#2d1810' } },
  { id: 'cool', label: 'Cool', colors: { bg: '#f0f4fa', text: '#0f1729' } },
  { id: 'forest', label: 'Forest', colors: { bg: '#f0faf4', text: '#0f2918' } },
]

const ACCENT_COLORS = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
  '#d4a574', '#6b7280',
]

export default function ThemePage() {
  const { profile, saving, updateProfile } = useProfile()
  const [accentColor, setAccentColor] = useState('#000000')
  const [themePreset, setThemePreset] = useState('minimal')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (profile) {
      setAccentColor(profile.accent_color || '#000000')
      setThemePreset(profile.theme_preset || 'minimal')
    }
  }, [profile])

  const handleSave = async () => {
    const { error } = await updateProfile({ accent_color: accentColor, theme_preset: themePreset })
    if (!error) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  const currentPreset = THEME_PRESETS.find(p => p.id === themePreset) || THEME_PRESETS[0]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Theme</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Customize your card appearance</p>
      </div>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm">Theme saved!</div>
      )}

      {/* Theme Preset */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Theme Preset</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setThemePreset(preset.id)}
              className={`relative rounded-xl border-2 p-4 text-center transition ${
                themePreset === preset.id
                  ? 'border-black dark:border-white'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
              }`}
            >
              <div
                className="w-full h-12 rounded-lg mb-2"
                style={{ backgroundColor: preset.colors.bg, border: '1px solid #e5e7eb' }}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="w-6 h-1 rounded" style={{ backgroundColor: preset.colors.text }} />
                </div>
              </div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{preset.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Accent Color</h3>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setAccentColor(color)}
              className={`w-10 h-10 rounded-full border-2 transition ${
                accentColor === color
                  ? 'border-black dark:border-white scale-110'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <div className="flex items-center gap-2 ml-2">
            <input
              type="color"
              value={accentColor}
              onChange={e => setAccentColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0"
            />
            <span className="text-xs text-gray-500">{accentColor}</span>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
        <div
          className="rounded-xl p-6 max-w-sm mx-auto"
          style={{ backgroundColor: currentPreset.colors.bg, color: currentPreset.colors.text }}
        >
          <div className="w-16 h-16 rounded-full mx-auto mb-3" style={{ backgroundColor: accentColor, opacity: 0.2 }} />
          <div className="text-center space-y-2">
            <div className="h-4 rounded mx-auto w-32" style={{ backgroundColor: currentPreset.colors.text, opacity: 0.8 }} />
            <div className="h-3 rounded mx-auto w-24" style={{ backgroundColor: currentPreset.colors.text, opacity: 0.4 }} />
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-8 w-20 rounded-lg" style={{ backgroundColor: accentColor }} />
            <div className="h-8 w-20 rounded-lg border" style={{ borderColor: accentColor, color: accentColor }} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 text-sm"
        >
          {saving ? 'Saving...' : 'Save Theme'}
        </button>
      </div>
    </div>
  )
}
