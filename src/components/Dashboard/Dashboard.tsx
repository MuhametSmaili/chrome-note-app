import { Tab } from '@components/Elements';
import clsx from 'clsx';
// ICONS
import Logo from '@icons/Logo.svg';
import Feather from '@icons/Feather';
import FolderIcon from '@icons/Folder';
import OcrIcon from '@icons/OcrIcon';

type DashboardProps = {
  onTabClick: (tabId: number) => void;
  activeTab: number;
};

const Dashboard = ({ onTabClick, activeTab }: DashboardProps) => {
  return (
    <div
      className={clsx(
        'pt-2 h-screen overflow-hidden',
        'flex flex-col  justify-start items-center pt-2 h-screen min-h-full',
        'bg-gradient-to-t from-blue-prussian/100 via-blue-prussian/80 to-blue-prussian/100',
        'w-[70px]',
      )}
    >
      <div className="mb-2">
        <Logo />
      </div>
      <Tab onClickHandler={() => onTabClick(0)} isActive={activeTab === 0}>
        <Feather active={activeTab === 0} />
      </Tab>
      <Tab onClickHandler={() => onTabClick(1)} isActive={activeTab === 1}>
        <FolderIcon active={activeTab === 1} />
      </Tab>
      <Tab onClickHandler={() => onTabClick(2)} isActive={activeTab === 2}>
        <OcrIcon active={activeTab === 2} />
      </Tab>
    </div>
  );
};

export default Dashboard;
