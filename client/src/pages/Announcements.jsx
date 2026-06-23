import { useEffect,
  useState } from "react";

import axios from "axios";
import Navbar from "../components/Navbar";

function Announcements() {
  const [announcements,
    setAnnouncements] =
    useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements =
    async () => {
      const res =
        await axios.get(
          "https://placement-portal-8sbz.onrender.com/api/announcement/all"
        );

      setAnnouncements(
        res.data
      );
    };

  return (
    <>
      <Navbar />

      <div className="announcement-card">
        <h2>
          Announcements
        </h2>

        {announcements.map(
          (item) => (
            <div
              key={item._id}
              className="announcement-card"
            >
              <h4>
                {item.title}
              </h4>

              <p>
                {
                  item.description
                }
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Announcements;