'use client';
import ToolTip from '@/components/tooltip'


export default function Home() {
  return (
  <div className="flex justify-center bg-gray-100 min-h-screen">
    <div className="text-base max-w-4xl mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Bay Valley Tech Component Library</h1>
      <p className="mb-4">
        This is a collection of components built by interns at Bay Valley Tech.
      </p>
      <h2 className="text-lg mb-4">List of components:</h2>
      <ul className="list-disc pl-5">
        <li className="mb-6">
          <h3 className="font-semibold">Toast</h3>
          <p className="mb-2">
            By Benjamin Schoolland
          </p>
          <p className="mb-2">
            A simple toast notification component for displaying messages to the user.
          </p>
          <p>
            <a href="/toast-demo" className="text-blue-500 hover:text-blue-700">View Demo</a>
          </p>
        </li>
        <li>
          <h3 className="font-semibold">Chatbot</h3>
          <p className="mb-2">
            By Benjamin Schoolland
          </p>
          <p className="mb-2">
            A chatbot component for answering the user's questions.
          </p>
          <p>
            <a href="/chatbot-demo" className="text-blue-500 hover:text-blue-700">View Demo</a>
          </p>
        </li>
        <li>
          <h3 className="font-semibold">
            Tooltip
          </h3>
          <p className="mb-2">
            By Benjamin Schoolland
          </p>
          <p className="mb-2">
            A tooltip component for displaying additional information on hover.
          </p>
          <ToolTip component={<p>Click here to go to the tooltip component!</p>}>
          <a href="/tooltip-demo" className="text-blue-500 hover:text-blue-700">View Demo</a>
          </ToolTip>
        </li>

        <li className="mb-6">
          <h3 className="font-semibold">Sidebar</h3>
          <p className="mb-2">
            By Naoko Violette
          </p>
          <p className="mb-2">
            A reusable and responsive sidebar component.
          </p>
          <p>
            <a href="/sidebar/dashboard" className="text-blue-500 hover:text-blue-700">View Demo</a>
          </p>
        </li>
        <li>
          <p>TODO: add more</p>
        </li>
      </ul>
    </div>
  </div>
);
}
