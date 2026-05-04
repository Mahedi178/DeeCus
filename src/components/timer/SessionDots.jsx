export default function SessionDots({ current, goal, color, timer }) {
  const isAllCompleted = current >= goal;

  const displaySessionNum = timer.mode === "work" ? current + 1 : current;

  const getCircleStyle = (index) => {
    if (isAllCompleted) {
      return {
        backgroundColor: color,
        borderColor: color,
        color: "#fff",
      };
    }

    if (index < current) {
      return {
        backgroundColor: color,
        borderColor: color,
        color: "#fff",
      };
    }

    if (index === current && timer.mode === "work") {
      return {
        backgroundColor: "#fff",
        borderColor: "#fff",
        color: "#000",
        boxShadow: `0 0 15px ${color}66`,
      };
    }
    return {
      backgroundColor: "transparent",
      borderColor: "var(--border)",
      color: "var(--muted)",
    };
  };

  const getStarStyle = () => {
    if (isAllCompleted) {
      return {
        backgroundColor: color,
        borderColor: color,
        color: "#fff",
      };
    }
    return {
      backgroundColor: "transparent",
      borderColor: "var(--border)",
      color: "var(--muted)",
    };
  };

  const getLineStyle = (index) => {
    if (isAllCompleted) return { backgroundColor: color };
    return {
      backgroundColor: index < current ? color : "var(--border)",
    };
  };

  const getStarLineStyle = () => {
    if (isAllCompleted) return { backgroundColor: color };
    return { backgroundColor: "var(--border)" };
  };

  return (
    <div className="mt-auto pt-10">
      <div className="text-center mb-6">
        <span className="text-(--muted) text-lg font-semibold tracking-widest uppercase">
          {timer.mode === "work" ? "Focus" : "Break"} #{displaySessionNum}
        </span>
      </div>

      <div className="w-full h-[2px] bg-(--border) rounded-[2px] mb-6 overflow-hidden">
        <div
          className="h-full rounded-[2px] transition-[width] duration-1000 linear"
          style={{
            width: `${(current / goal) * 100}%`,
            background: color,
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {Array.from({ length: goal }, (_, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300"
              style={getCircleStyle(index)}
            >
              {index + 1}
            </div>

            {index < goal - 1 && (
              <div
                className="h-0.5 w-4 transition-all duration-300"
                style={getLineStyle(index)}
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-1.5">
          <div
            className="h-0.5 w-4 transition-all duration-300"
            style={getStarLineStyle()}
          />
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-base border-2 transition-all duration-300"
            style={getStarStyle()}
          >
            ★
          </div>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-(--muted) uppercase tracking-widest mt-4">
        <span>Daily Progress</span>
        <span style={{ color }}>
          {current} / {goal}
        </span>
      </div>
    </div>
  );
}
