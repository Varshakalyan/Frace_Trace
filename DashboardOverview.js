import React, { useEffect, useState } from "react";

const DashboardOverview = () => {
  const [summary, setSummary] = useState({
    totalProfiles: 0,
    fakeIDs: 0,
    forgedImages: 0,
    recentReports: [],
  });

  useEffect(() => {
    
    const fakeData = JSON.parse(localStorage.getItem("facetrace_summary")) || {
      totalProfiles: 4,
      fakeIDs: 2,
      forgedImages: 1,
      recentReports: [
        { username: "insta_girl_33", result: "❌ Fake ID", type: "Instagram" },
        { username: "real_user_92", result: "✅ Authentic", type: "Facebook" },
        { username: "photo_123.jpg", result: "❌ Forged Image", type: "Upload" },
        { username: "john_face", result: "✅ Authentic", type: "Twitter" },
      ],
    };

    setSummary(fakeData);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-xl shadow">👥 Total Profiles: <strong>{summary.totalProfiles}</strong></div>
        <div className="bg-red-100 p-6 rounded-xl shadow">🚨 Fake IDs Detected: <strong>{summary.fakeIDs}</strong></div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow">🖼️ Forged Images: <strong>{summary.forgedImages}</strong></div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">📝 Recent Analysis</h2>
        <ul className="space-y-2">
          {summary.recentReports.map((report, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-md shadow">
              <strong>{report.username}</strong> - {report.result} ({report.type})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
