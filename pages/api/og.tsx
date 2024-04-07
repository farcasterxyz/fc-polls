import type { NextApiRequest, NextApiResponse } from "next";
import { ImageResponse } from "@vercel/og";
import { join } from "path";
import * as fs from "fs";

const fontPath = join(process.cwd(), "Roboto-Regular.ttf");
let fontData = fs.readFileSync(fontPath);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(241,241,241)",
          gap: "40px",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "8px",
            right: "8px",
          }}
        >
          <svg
            width="76"
            height="15"
            viewBox="0 0 76 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Gifted.art">
              <path
                id="Vector"
                d="M74.9074 4.65901C75.0194 4.65901 75.0754 4.73101 75.0754 4.87501C75.0754 5.00301 74.9794 5.19501 74.7874 5.45101C74.6114 5.70701 74.4434 5.83501 74.2834 5.83501C74.2354 5.83501 73.9714 5.79501 73.4914 5.71501C73.0274 5.63501 72.4994 5.57901 71.9074 5.54701L70.8994 11.259C70.8674 11.515 70.8514 11.691 70.8514 11.787C70.8514 12.171 70.9474 12.451 71.1394 12.627C71.3474 12.803 71.6594 12.891 72.0754 12.891C72.6834 12.891 73.3554 12.595 74.0914 12.003H74.1154C74.1794 12.003 74.2354 12.027 74.2834 12.075C74.3314 12.123 74.3314 12.171 74.2834 12.219C73.5474 12.923 72.8914 13.435 72.3154 13.755C71.7554 14.059 71.1954 14.211 70.6354 14.211C69.3394 14.211 68.6914 13.627 68.6914 12.459C68.6914 12.219 68.7154 11.955 68.7634 11.667L69.6994 6.57901C69.7474 6.30701 69.7714 6.08301 69.7714 5.90701C69.7714 5.66701 69.7074 5.50701 69.5794 5.42701C69.4514 5.34701 69.2194 5.30701 68.8834 5.30701C68.8354 5.30701 68.8114 5.25101 68.8114 5.13901C68.8114 4.99501 68.8354 4.92301 68.8834 4.92301C70.1634 4.92301 71.1794 4.21901 71.9314 2.81101C71.9634 2.76301 72.0194 2.73901 72.0994 2.73901C72.1794 2.73901 72.2514 2.75501 72.3154 2.78701C72.3794 2.81901 72.4034 2.85101 72.3874 2.88301L72.0274 4.85101C72.4754 4.83501 72.8594 4.81901 73.1794 4.80301C73.4994 4.77101 73.7714 4.74701 73.9954 4.73101C74.4114 4.68301 74.7154 4.65901 74.9074 4.65901Z"
                fill="black"
              ></path>
              <path
                id="Vector_2"
                d="M67.1443 4.44299C67.5603 4.44299 67.9523 4.59499 68.3203 4.89899C68.7043 5.20299 68.8643 5.54699 68.8003 5.93099C68.7683 6.17099 68.6563 6.39499 68.4643 6.60299C68.2723 6.81099 68.0323 6.91499 67.7443 6.91499C67.4563 6.91499 67.1443 6.77899 66.8083 6.50699C66.6963 6.42699 66.5843 6.35499 66.4723 6.29099C66.3603 6.22699 66.2483 6.19499 66.1363 6.19499C65.8643 6.19499 65.5283 6.61899 65.1283 7.46699C64.7283 8.31499 64.3443 9.33099 63.9763 10.515C63.6243 11.683 63.3683 12.715 63.2083 13.611V13.635C63.1763 13.779 63.0483 13.891 62.8243 13.971C62.6003 14.067 62.2803 14.115 61.8643 14.115C61.3363 14.115 61.0723 14.051 61.0723 13.923C61.0883 13.811 61.1363 13.571 61.2163 13.203C61.3123 12.835 61.3923 12.483 61.4563 12.147L62.4403 6.79499C62.4723 6.53899 62.4883 6.37099 62.4883 6.29099C62.4883 5.84299 62.3443 5.61899 62.0563 5.61899C61.7363 5.61899 61.2803 5.93899 60.6883 6.57899C60.6723 6.59499 60.6483 6.60299 60.6163 6.60299C60.5523 6.60299 60.5043 6.57899 60.4723 6.53099C60.4403 6.46699 60.4483 6.41099 60.4963 6.36299C61.0723 5.69099 61.5843 5.20299 62.0323 4.89899C62.4963 4.59499 62.9603 4.44299 63.4243 4.44299C63.8243 4.44299 64.1123 4.55499 64.2883 4.77899C64.4643 4.98699 64.5523 5.29899 64.5523 5.71499C64.5523 5.95499 64.5283 6.21899 64.4803 6.50699L64.0003 9.14699C64.9443 6.01099 65.9923 4.44299 67.1443 4.44299Z"
                fill="black"
              ></path>
              <path
                id="Vector_3"
                d="M60.2713 12.075C60.2873 12.059 60.3113 12.051 60.3433 12.051C60.3913 12.051 60.4313 12.083 60.4633 12.147C60.4953 12.195 60.4953 12.235 60.4633 12.267C59.4393 13.515 58.5433 14.139 57.7753 14.139C57.3593 14.139 57.0553 14.027 56.8633 13.803C56.6713 13.563 56.5753 13.195 56.5753 12.699C56.5753 12.427 56.5993 12.123 56.6473 11.787L56.9353 10.155C56.3273 11.435 55.5993 12.435 54.7513 13.155C53.9193 13.875 53.1033 14.235 52.3033 14.235C51.8073 14.235 51.4153 14.083 51.1273 13.779C50.8393 13.475 50.6953 13.019 50.6953 12.411C50.6953 11.339 51.0473 10.171 51.7513 8.90699C52.4713 7.62699 53.3513 6.54699 54.3913 5.66699C55.4473 4.78699 56.4393 4.34699 57.3673 4.34699C57.6553 4.34699 57.9513 4.40299 58.2553 4.51499C58.5753 4.61099 58.8473 4.763 59.0713 4.97099C59.3753 4.74699 59.6233 4.47499 59.8153 4.15499C59.8473 4.12299 59.8793 4.10699 59.9113 4.10699C59.9593 4.10699 60.0073 4.12299 60.0553 4.15499C60.1033 4.18699 60.1193 4.21099 60.1033 4.22699L58.7113 11.787C58.6633 11.995 58.6393 12.179 58.6393 12.339C58.6393 12.723 58.7513 12.915 58.9753 12.915C59.2793 12.915 59.7113 12.635 60.2713 12.075ZM53.8393 12.483C54.3193 12.483 54.8073 12.235 55.3033 11.739C55.8153 11.227 56.2553 10.611 56.6233 9.891C57.0073 9.15499 57.2553 8.47499 57.3673 7.85099C57.4153 7.57899 57.4393 7.33899 57.4393 7.13099C57.4393 6.61899 57.3193 6.22699 57.0793 5.95499C56.8553 5.66699 56.5353 5.52299 56.1193 5.52299C55.3833 5.52299 54.7273 5.92299 54.1513 6.72299C53.5913 7.50699 53.1993 8.53099 52.9753 9.79499C52.8953 10.307 52.8553 10.691 52.8553 10.947C52.8553 11.475 52.9433 11.867 53.1193 12.123C53.2953 12.363 53.5353 12.483 53.8393 12.483Z"
                fill="black"
              ></path>
              <path
                id="Vector_4"
                d="M47.2656 12.771C47.2656 12.069 47.8056 11.511 48.5076 11.511C49.2096 11.511 49.7676 12.069 49.7676 12.771C49.7676 13.473 49.2096 14.013 48.5076 14.013C47.8056 14.013 47.2656 13.473 47.2656 12.771Z"
                fill="black"
              ></path>
              <path
                id="Vector_5"
                d="M38.5913 9.56699C38.5913 11.349 39.5093 12.663 41.1293 12.663C42.6773 12.663 43.6313 11.313 43.6313 9.53099C43.6313 7.74899 42.6953 6.52499 41.1473 6.52499C39.5993 6.52499 38.5913 7.78499 38.5913 9.56699ZM43.6493 12.753V12.609C43.2353 13.437 42.3173 14.157 40.9673 14.157C38.4293 14.157 36.8633 12.141 36.8633 9.56699C36.8633 7.11899 38.5193 5.03099 40.9673 5.03099C42.4973 5.03099 43.3253 5.78699 43.6133 6.48899V0.890991H45.2873V12.321C45.2873 13.149 45.3593 13.779 45.3773 13.923H43.7393C43.7033 13.725 43.6493 13.275 43.6493 12.753Z"
                fill="black"
              ></path>
              <path
                id="Vector_6"
                d="M29.6457 8.70299H34.3797C34.3437 7.46099 33.5337 6.48899 32.0037 6.48899C30.5817 6.48899 29.7177 7.58699 29.6457 8.70299ZM34.6317 10.953L36.0897 11.457C35.6037 12.987 34.2177 14.193 32.2017 14.193C29.8797 14.193 27.8457 12.501 27.8457 9.56699C27.8457 6.84899 29.8077 4.995 31.9857 4.995C34.6497 4.995 36.1437 6.83099 36.1437 9.53099C36.1437 9.74699 36.1257 9.96299 36.1077 10.071H29.5917C29.6277 11.619 30.7437 12.699 32.2017 12.699C33.6057 12.699 34.3077 11.925 34.6317 10.953Z"
                fill="black"
              ></path>
              <path
                id="Vector_7"
                d="M25.225 2.52899V5.26499H27.097V6.79499H25.225V11.295C25.225 12.087 25.549 12.483 26.431 12.483C26.647 12.483 26.953 12.447 27.097 12.411V13.851C26.953 13.905 26.521 14.013 25.945 14.013C24.469 14.013 23.533 13.113 23.533 11.547V6.79499H21.877V5.26499H22.345C23.281 5.26499 23.677 4.68899 23.677 3.93299V2.52899H25.225Z"
                fill="black"
              ></path>
              <path
                id="Vector_8"
                d="M21.8618 6.79504H19.7738V13.923H18.0278V6.79504H16.4258V5.26504H18.0278V3.80704C18.0278 1.88104 19.3058 0.837036 20.8718 0.837036C21.4478 0.837036 21.8078 0.963037 21.8798 1.01704V2.52904C21.7898 2.49304 21.5738 2.42104 21.1418 2.42104C20.5478 2.42104 19.7738 2.70904 19.7738 3.89704V5.26504H21.8618V6.79504Z"
                fill="black"
              ></path>
              <path
                id="Vector_9"
                d="M15.3469 13.923H13.6729V5.26501H15.3469V13.923ZM13.2949 1.98901C13.2949 1.30501 13.8349 0.765015 14.5009 0.765015C15.1849 0.765015 15.7249 1.30501 15.7249 1.98901C15.7249 2.65501 15.1849 3.19501 14.5009 3.19501C13.8349 3.19501 13.2949 2.65501 13.2949 1.98901Z"
                fill="black"
              ></path>
              <path
                id="Vector_10"
                d="M11.862 13.923H10.44L10.278 12.123C9.72 13.131 8.334 14.193 6.192 14.193C2.988 14.193 0 11.853 0 7.53299C0 3.21299 3.168 0.890991 6.318 0.890991C9.09 0.890991 11.232 2.43899 11.97 4.74299L10.368 5.42699C9.792 3.59099 8.298 2.51099 6.318 2.51099C4.032 2.51099 1.8 4.14899 1.8 7.53299C1.8 10.917 3.96 12.591 6.246 12.591C9.09 12.591 10.116 10.575 10.188 9.26099H5.76V7.67699H11.862V13.923Z"
                fill="black"
              ></path>
            </g>
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            borderRadius: "4px",
            backgroundColor: "#fff",
            padding: "20px 16px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 18px 105.7px 18px",
            width: "40%",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontStyle: "italic",
              fontWeight: "450",
              fontSize: "32px",
              lineHeight: "48px",
              letterSpacing: "-0.8px",
            }}
          >
            To Andrew Jiang
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              width: "100%",
              lineHeight: "21px",
              letterSpacing: "-0.308px",
              color: "rbg(70,70,70)",
              fontSize: "14px",
              fontWeight: "450",
            }}
          >
            You're amongst the first people to be Gifted!
            <br />
            <br />
            As a friend of the Gifted.art team, we hope you'll love "Year of the
            Dragon" by Shavonne Wong. It's a powerful piece that merges our
            history and tradition with the bright future we're all building
            together.
            <br />
            <br />
            May it bring you happiness and prosperity in the year to come.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            alignItems: "center",
          }}
        >
          <img
            style={{
              borderRadius: "4px",
              border: "8px solid #fff",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 18px 105.7px 18px",
            }}
            width="240"
            src="https://gifted.art/assets/poster-edd9e9f4.jpg"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              alignItems: "center",
            }}
          >
            <p
              style={{
                letterSpacing: "-0.32px",
                lineHeight: "27px",
                margin: "0px",
                color: "rgb(70,70,70)",
                fontSize: "16px",
                fontWeight: "700",
                fontStyle: "italic",
              }}
            >
              Year of the Dragon
            </p>
            <p
              style={{
                letterSpacing: "-0.32px",
                lineHeight: "17px",
                margin: "0px",
                color: "rgb(70,70,70)",
                fontSize: "14px",
                fontWeight: "450",
                fontStyle: "italic",
              }}
            >
              Shavonne Wong
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 400,
      fonts: [
        {
          data: fontData,
          name: "Roboto",
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
