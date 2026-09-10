import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export function generateStaticParams() {
  return [
    { title: "" },
    { title: "Sample Post Title" },
    { title: "A Longer Post Title That Should Wrap to Two Lines" },
  ];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const title = searchParams.get("title") ?? "";
    const date = searchParams.get("date");
    const tagsParam = searchParams.get("tags");

    const tagList = tagsParam ? tagsParam.split(",").filter(Boolean) : [];

    // Use system fonts or specify a font for consistent rendering
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            backgroundImage:
              "radial-gradient(circle at 50% 0%, #1a1a2e 0%, #0a0a0a 70%)",
            padding: "80px",
          }}
        >
          {/* Accent line */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 80,
              right: 80,
              height: 3,
              background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
              borderRadius: 2,
            }}
          />

          {/* Label */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "system-ui, sans-serif",
              color: "#3b82f6",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Cloud Engineer Journey
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              fontFamily: "system-ui, sans-serif",
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: 1100,
              letterSpacing: "-0.02em",
            }}
          >
            {title || "Post Title"}
          </div>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 32,
            }}
          >
            {date && (
              <span
                style={{
                  fontSize: 22,
                  fontFamily: "system-ui, sans-serif",
                  color: "#9ca3af",
                }}
              >
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {tagList.length > 0 && (
              <>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#4b5563",
                  }}
                />
                <div style={{ display: "flex", gap: 10 }}>
                  {tagList.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 18,
                        fontFamily: "system-ui, sans-serif",
                        color: "#6b7280",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        padding: "6px 14px",
                        borderRadius: 20,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG error:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
