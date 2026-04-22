import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

/**
 * Bar chart component to visualize scores per subtest.
 *
 * Props:
 * - data: array of objects { name: string, score: number }
 */
export default function ScoreChart({ data }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#C084FC" tick={{ fill: '#ffffff', fontSize: 12 }} />
          <YAxis stroke="#C084FC" tick={{ fill: '#ffffff', fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: '#1A1535', border: '1px solid #2D2550', color: '#ffffff' }} />
          <Bar dataKey="score" fill="#6C4FF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}