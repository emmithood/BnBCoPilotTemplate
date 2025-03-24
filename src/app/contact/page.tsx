'use client';

export default function ContactPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">Contact Us</h2>
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8 border border-[#e9ecef]">
        <p className="text-gray-600 mb-6">
          Have questions or need assistance? Our team is here to help.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-accent text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}