const GITHUB_USERNAME = "m-ahmad-amin";
const LEETCODE_USERNAME = "mahmadamindw";

const LEVEL_COLORS = [
  "#21262d",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getLevel(count, maxCount) {
  if (!count) return 0;
  if (maxCount <= 0) return 1;

  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function parseLeetCodeCalendar(submissionCalendar) {
  const calendar = JSON.parse(submissionCalendar || "{}");
  const byDate = {};

  Object.entries(calendar).forEach(([timestamp, count]) => {
    const date = new Date(Number(timestamp) * 1000).toISOString().slice(0, 10);
    byDate[date] = (byDate[date] || 0) + Number(count);
  });

  return byDate;
}

async function fetchGitHubContributions() {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
  );

  if (!response.ok) {
    throw new Error("Failed to load GitHub activity");
  }

  const data = await response.json();
  return data.contributions || [];
}

async function fetchLeetCodeContributions() {
  const response = await fetch("/api/leetcode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query userCalendar($username: String!) {
          matchedUser(username: $username) {
            userCalendar {
              submissionCalendar
            }
          }
        }
      `,
      variables: { username: LEETCODE_USERNAME },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to load LeetCode activity");
  }

  const data = await response.json();
  const submissionCalendar =
    data?.data?.matchedUser?.userCalendar?.submissionCalendar;

  return parseLeetCodeCalendar(submissionCalendar);
}

export function buildWeekGrid(contributions) {
  if (!contributions.length) return [];

  const weeks = [];
  let currentWeek = [];
  const firstDay = new Date(`${contributions[0].date}T00:00:00Z`).getUTCDay();

  for (let index = 0; index < firstDay; index += 1) {
    currentWeek.push(null);
  }

  contributions.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length) {
    weeks.push(currentWeek);
  }

  return weeks;
}

export function buildMonthLabels(weeks) {
  let lastMonth = -1;

  return weeks.map((week) => {
    const firstDay = week.find((day) => day !== null);
    if (!firstDay) return "";

    const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      return MONTH_LABELS[month];
    }

    return "";
  });
}

export async function fetchCombinedCodingGraph() {
  const [githubDays, leetcodeByDate] = await Promise.all([
    fetchGitHubContributions(),
    fetchLeetCodeContributions(),
  ]);

  const mergedDays = githubDays.map((day) => {
    const combinedCount = day.count + (leetcodeByDate[day.date] || 0);
    return {
      date: day.date,
      github: day.count,
      leetcode: leetcodeByDate[day.date] || 0,
      count: combinedCount,
    };
  });

  const maxCount = Math.max(...mergedDays.map((day) => day.count), 0);
  const contributions = mergedDays.map((day) => ({
    ...day,
    level: getLevel(day.count, maxCount),
  }));

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  const weeks = buildWeekGrid(contributions);

  return {
    contributions,
    weeks,
    monthLabels: buildMonthLabels(weeks),
    totalContributions,
    levelColors: LEVEL_COLORS,
  };
}
