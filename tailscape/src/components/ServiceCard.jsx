import { FaStethoscope, FaCut, FaGraduationCap, FaHome, FaUser, FaHeart } from 'react-icons/fa';

const iconMap = {
  stethoscope: FaStethoscope,
  cut: FaCut,
  'graduation-cap': FaGraduationCap,
  home: FaHome,
  user: FaUser,
  heart: FaHeart,
};

export default function ServiceCard({ title, description, icon }) {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="text-4xl text-indigo-500 mb-4">
        <IconComponent />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
