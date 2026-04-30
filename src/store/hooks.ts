import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Provides typed Redux hooks to ensure type safety throughout the application
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (selector: (state: RootState) => any) => useSelector(selector);
