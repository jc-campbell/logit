import { PostPreview } from "../../../components/Post";
import { Forecast } from "../../../components/Forecast";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

const HomePage = () => {
  const [testProbabilty, setTestProbability] = useState(50);
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTestProbability(parseInt(e.currentTarget.value));
    },
    [testProbabilty]
  );

  const postData = useMemo(
    () => [
      {
        profilePic: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 71)}`,
        author: "Josh Allen",
        content:
          "The thing about economic policy is that, like most things, it’s both complicated and boring.\n\nBut as humans, we get bored easily. So complicated things become simple, and boring things become exciting.",
        numLikes: Math.floor(Math.random() * 100),
        numComments: Math.floor(Math.random() * 100)
      },
      {
        profilePic: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 71)}`,
        author: "Jameis Winston",
        content:
          "The evolution of technology is incredible, but sometimes I wonder if we're sacrificing real connections for digital ones.",
        numLikes: Math.floor(Math.random() * 100),
        numComments: Math.floor(Math.random() * 100),
        forecast: (
          <Forecast
            event="The iPhone 17 will be released"
            duedate="10/11/2025"
            probability={Math.random()}
            community="tech"
          />
        )
      },
      {
        profilePic: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 71)}`,
        author: "Dak Prescott",
        content:
          "I've been thinking a lot about the future lately. It's hard to predict what's going to happen, but I'm excited to see where we go from here.",
        imgSrc: "https://picsum.photos/600/400",
        numLikes: Math.floor(Math.random() * 100),
        numComments: Math.floor(Math.random() * 100)
      },
      {
        profilePic: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 71)}`,
        author: "Lamar Jackson",
        content:
          "Is it just me or does the endless scroll on social media feel like a never-ending vortex of information overload? Sometimes I miss the days of flipping through a physical newspaper.",
        numLikes: Math.floor(Math.random() * 100),
        numComments: Math.floor(Math.random() * 100)
      },
      {
        profilePic: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 71)}`,
        author: "Patrick Mahomes",
        content:
          "I have been in conversations with people about “the economy” and “the economy” means different things to different people.\n\nAnd I don’t mean that the “economy” is reducible to “the economy” to those conversations. I mean that “the economy” is reducible to “the economy” to those conversations.",
        numLikes: Math.floor(Math.random() * 100),
        numComments: Math.floor(Math.random() * 100)
      }
    ],
    [testProbabilty]
  );
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-4xl">
        {/* Side Content */}
        <div className="sticky right-0 top-8 float-right ml-4 hidden w-72 md:block">
          <div className="rounded-lg border border-border p-2 dark:border-border-dark">
            <h2 className="font-bold">Trending</h2>
            <ul>
              <li className="mt-2">
                <a href="#" className="underline">
                  #Tech
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="underline">
                  #Politics
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="underline">
                  #Economics
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="underline">
                  #Sports
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <input
          type="number"
          value={testProbabilty}
          className="text-black"
          onInput={handleInput}
        /> */}
        {/* Feed */}
        <div className="px-0 md:px-2 md:pr-80">
          {postData.map((post, i) => (
            <PostPreview
              key={i}
              profilePic={post.profilePic}
              author={post.author}
              content={post.content}
              imgSrc={post.imgSrc}
              numLikes={post.numLikes}
              numComments={post.numComments}
              forecast={post.forecast}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
