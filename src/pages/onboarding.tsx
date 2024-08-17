import { OnboardingForm } from '../components/OnboardingForm';

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-emerald-600">Welcome to Pennywise</h1>
        <p className="mb-6 text-gray-600">To get started, please set up your Google Sheet and enter its ID below.</p>
        <OnboardingForm />
      </div>
    </div>
  );
}