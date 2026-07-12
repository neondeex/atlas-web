import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Atlas. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your data when you visit our website 
              (<strong>atlasfm.modhyt.org</strong>) and when you use our desktop application (<strong>Atlas File Manager</strong>).
            </p>
          </section>

          <section className="space-y-4 mt-8 p-6 bg-secondary/30 rounded-xl border border-border">
            <h2 className="text-2xl font-semibold text-primary">2. The Desktop Application (Atlas File Manager)</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Atlas File Manager is designed with privacy as a foundational principle.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Local File Access:</strong> To function as a file manager, the application requires access to the files and folders on your local device. This access is strictly used to display, manage, and interact with your files locally.</li>
              <li><strong>No Data Transmission:</strong> We <strong>do not</strong> collect, transmit, upload, or store your personal files, file names, folder structures, or file contents on any external servers. Your files never leave your device.</li>
              <li><strong>Telemetry & Usage Data:</strong> The desktop application currently does not collect any background telemetry or usage analytics. In the future, if anonymous usage statistics are introduced to help improve the app, they will be strictly opt-in and will never include personally identifiable information (PII) or file data.</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold text-primary">3. The Website</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you visit our promotional website or sign up for our waitlist, we may collect the following data:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Contact Data:</strong> Includes your email address if you voluntarily submit it to join our waitlist or newsletter. We use this strictly to notify you about product updates.</li>
              <li><strong>Usage & Technical Data:</strong> We use an analytics tool (PostHog) to understand how visitors interact with our website. This includes tracking button clicks (e.g., joining the Discord, clicking Pre-order), your browser type, operating system, and anonymized IP address. This data is used solely to improve our website experience and measure interest.</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold text-primary">4. How We Use Your Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              We will only use your personal data when the law allows us to. For website visitors, we use your data to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Send you the communications you requested (e.g., waitlist access).</li>
              <li>Analyze website traffic and optimize our marketing efforts using aggregated, anonymous data.</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold text-primary">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. For the desktop application, the best security is that we simply do not collect your files.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold text-primary">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or our privacy practices, please reach out to us through our official Discord community or via the contact information provided on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
