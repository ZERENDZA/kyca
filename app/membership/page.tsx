"use client"

import { useState } from "react"
import { Check, ChevronRight, Users, BookOpen, Globe, Heart, Zap, Music, Leaf, Briefcase, Loader2 } from "lucide-react"

const membershipTiers = [
  {
    id: "standard",
    name: "KYCA Member",
    price: "₦10,000/year",
    color: "border-primary ring-2 ring-primary/20",
    buttonStyle: "bg-primary text-white hover:bg-primary/90",
    popular: true,
    features: [
      "Access to community forum",
      "Monthly newsletter",
      "Voting rights",
      "Priority event access",
      "Mentorship matching",
      "Skills workshops",
      "Member directory access",
    ],
  },
]

const interests = [
  { id: "youth", label: "Youth Empowerment", icon: Users },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "entrepreneurship", label: "Entrepreneurship", icon: Briefcase },
  { id: "culture", label: "Cultural Preservation", icon: Globe },
  { id: "technology", label: "Technology", icon: Zap },
  { id: "agriculture", label: "Agriculture", icon: Leaf },
  { id: "arts", label: "Arts & Entertainment", icon: Music },
  { id: "health", label: "Health", icon: Heart },
]

export default function MembershipPage() {
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", location: "", bio: ""
  })

  function toggleInterest(id: string) {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  function validateStep1() {
    if (!formData.name.trim()) return "Please enter your full name."
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email address."
    return ""
  }

  function goToStep2() {
    const err = validateStep1()
    if (err) { setError(err); return }
    setError("")
    setStep(2)
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError("")

    try {
      // Save member to Supabase
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          membership_type: "basic",
          status: "active",
          bio: formData.bio,
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Registration failed.")

      // Send confirmation email
      await fetch("/api/members/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          membership_type: "basic",
        })
      })

      setStep(4)
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <div className="bg-[#3d2b1f] text-white py-16 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Join the Movement</p>
        <h1 className="font-serif text-4xl font-bold mb-4">Become a KYCA Member</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Connect with thousands of Kamwe youth, access exclusive resources, and help shape the future of our community.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Tier Selection */}
        {step <= 3 && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-center text-[#3d2b1f] mb-2">Membership Benefits</h2>
            <p className="text-center text-sm text-gray-500 mb-8">Join our vibrante community today</p>
            <div className="flex justify-center">
              <div className="max-w-md w-full relative rounded-xl border-2 border-primary ring-2 ring-primary/20 p-8 bg-white transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">Official Membership</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#3d2b1f]">KYCA Member</h3>
                <p className="text-3xl font-bold text-primary mt-2 mb-6">₦10,000 <span className="text-sm font-normal text-gray-500">/year</span></p>
                <ul className="space-y-3 mb-8">
                  {membershipTiers[0].features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setStep(1)}
                  className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Start Registration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  step === s ? "bg-primary text-white" : step > s ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                <span className={`text-xs hidden sm:block ${step === s ? "text-[#3d2b1f] font-medium" : "text-gray-400"}`}>
                  {s === 1 ? "Personal Info" : s === 2 ? "Interests" : "Confirm"}
                </span>
                {s < 3 && <ChevronRight className="h-4 w-4 text-gray-300" />}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8">
            <h2 className="font-serif text-xl font-bold text-[#3d2b1f] mb-6">Personal Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your full name" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+234 000 000 0000" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Location / Region</label>
                <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Michika, Adamawa State" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Short Bio <span className="text-gray-400">(optional)</span></label>
                <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={3} placeholder="Tell us a little about yourself..." className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
            </div>
            {error && <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}
            <div className="mt-6 flex justify-end">
              <button onClick={goToStep2} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8">
            <h2 className="font-serif text-xl font-bold text-[#3d2b1f] mb-2">Your Interests</h2>
            <p className="text-sm text-gray-500 mb-6">Select all that apply — we'll connect you with relevant programs.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                    selectedInterests.includes(interest.id)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary/40"
                  }`}
                >
                  <interest.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{interest.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(1)} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium hover:bg-gray-50">Back</button>
              <button onClick={() => setStep(3)} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">Continue →</button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8">
            <h2 className="font-serif text-xl font-bold text-[#3d2b1f] mb-6">Confirm Your Details</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: "Name", value: formData.name },
                { label: "Email", value: formData.email },
                { label: "Phone", value: formData.phone || "Not provided" },
                { label: "Location", value: formData.location || "Not provided" },
                { label: "Interests", value: selectedInterests.length > 0 ? selectedInterests.map(id => interests.find(i => i.id === id)?.label).join(", ") : "None selected" },
              ].map(row => (
                <div key={row.label} className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-[#3d2b1f] text-right max-w-[60%]">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-500">Membership</span>
                <span className="font-medium text-primary">KYCA Member</span>
              </div>
            </div>
            {error && <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(2)} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium hover:bg-gray-50">Back</button>
              <button onClick={handleSubmit} disabled={submitting} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 flex items-center gap-2 disabled:opacity-60">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {submitting ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center py-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#3d2b1f] mb-3">Welcome to KYCA!</h2>
            <p className="text-gray-600 mb-2">Thank you, <strong>{formData.name}</strong>. Your registration is complete.</p>
            <p className="text-sm text-gray-500 mb-8">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
            <a href="/" className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90">Back to Home</a>
          </div>
        )}
      </div>
    </div>
  )
}