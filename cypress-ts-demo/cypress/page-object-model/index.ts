/**
 * Page Objects Index
 * Central export point for all page objects
 */

// Import all page objects
import BasePage from './BasePage';
import TodoPage from './pages/TodoPage';
import ActionsPage from './pages/ActionsPage';
import QueryingPage from './pages/QueryingPage';
import NetworkRequestsPage from './pages/NetworkRequestsPage';
import AliasingPage from './pages/AliasingPage';
import AssertionsPage from './pages/AssertionsPage';
import ConnectorsPage from './pages/ConnectorsPage';
import CookiesPage from './pages/CookiesPage';
import LocationPage from './pages/LocationPage';
import TraversalPage from './pages/TraversalPage';
import UtilitiesPage from './pages/UtilitiesPage';
import CypressApiPage from './pages/CypressApiPage';
import FilesPage from './pages/FilesPage';
import MiscPage from './pages/MiscPage';
import NavigationPage from './pages/NavigationPage';
import SpiesStubsClocksPage from './pages/SpiesStubsClocksPage';
import StoragePage from './pages/StoragePage';

// Export all page objects
export {
  BasePage,
  TodoPage,
  ActionsPage,
  QueryingPage,
  NetworkRequestsPage,
  AliasingPage,
  AssertionsPage,
  ConnectorsPage,
  CookiesPage,
  LocationPage,
  TraversalPage,
  UtilitiesPage,
  CypressApiPage,
  FilesPage,
  MiscPage,
  NavigationPage,
  SpiesStubsClocksPage,
  StoragePage
};

// Default export with all page objects as properties
export default {
  BasePage,
  TodoPage,
  ActionsPage,
  QueryingPage,
  NetworkRequestsPage,
  AliasingPage,
  AssertionsPage,
  ConnectorsPage,
  CookiesPage,
  LocationPage,
  TraversalPage,
  UtilitiesPage,
  CypressApiPage,
  FilesPage,
  MiscPage,
  NavigationPage,
  SpiesStubsClocksPage,
  StoragePage
};