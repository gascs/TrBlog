import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User } from '../types';

interface AdminLinkProps extends LinkProps {
  user: User | null;
  children: React.ReactNode;
  variant?: 'nav' | 'footer' | 'dropdown' | 'button';
  icon?: React.ReactNode;
}

const AdminLink: React.FC<AdminLinkProps> = ({ 
  user, 
  children, 
  variant = 'nav', 
  icon,
  ...props 
}) => {
  const isAdminOrEditor = user && ['ADMIN', 'EDITOR'].includes(user.role);

  if (!isAdminOrEditor) {
    return null;
  }

  const getClassName = () => {
    switch (variant) {
      case 'nav':
        return 'text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2';
      case 'footer':
        return 'text-gray-500 hover:text-primary text-sm transition-colors flex items-center gap-1';
      case 'dropdown':
        return 'flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary-light/10 rounded-lg transition-all duration-300';
      case 'button':
        return 'inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all hover:scale-105 font-semibold';
      default:
        return 'text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: variant === 'button' ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={props.to as string} className={getClassName()} {...props}>
        {icon && icon}
        {children}
      </Link>
    </motion.div>
  );
};

export default AdminLink;