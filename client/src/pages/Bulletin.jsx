import { useEffect, useState } from "react";

import IELOGOBIG from "../assets/logo-big.png";

import Header from "../components/Header";

const Bulletin = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/ie-connect/api/bulletin",
          {
            credentials: "include", // Include credentials (cookies)
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data.announcement);
        } else {
          console.error("Failed to fetch announcements:", response.status);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      <Header />
      <section className="bulletin-page-main">
        <section className="bulletin-page">
          <div>
            <h1>Announcement!</h1>
          </div>
          <div>
            <ul>
              {announcements ? (
                announcements.map((item) => {
                  return <li key={item._id}>{item.announcement}</li>;
                })
              ) : (
                <li>No Announcement</li>
              )}
            </ul>
            {/* <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis, eaque!
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis, eaque!
              </li> */}
          </div>
        </section>
        <section className="about-org-section">
          <div>
            <h2>About the organization</h2>
          </div>
          <div className="ie-logo-container">
            <img src={IELOGOBIG} alt="" />
          </div>
          <div className="piie-pupbc-container">
            <h2>PIIE-PUPBSC</h2>
            <p>Philippine Institute of Industrial Engineers</p>
            <p>
              Polytechnic University of the Philippines - Biñan Student Chapter
            </p>
          </div>
          <div className="socials-container">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>G-mail</span>
          </div>
          <div className="mission-vision-container">
            <div>
              <h3>Mission</h3>
              <p>
                The Philippine Institute of Industrial Engineers – Polytechnic
                University of the Philippines Biñan Student Chapter, as a
                university recognized organization, aims to promote the rights
                and welfare of every Industrial Engineering students and all its
                members to develop a strong and harmonious foundation within its
                community and elaborating the skills of its officers and members
                for global competitiveness and national progression.
              </p>
            </div>
            <div>
              <h3>Vision</h3>
              <p>
                The Philippine Institute of Industrial Engineers – Polytechnic
                University of the Philippines Biñan Student Chapter, guided by
                University values, envisions the formation and development of an
                organization entrusted to promote a dynamic, arbitrary, and
                unceasing quest for academic excellence and technical expertise;
                motivator student’s interests towards excellence in Industrial
                Engineering as their field of specialization and to promote the
                school’s and organization’s existence.
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Bulletin;
