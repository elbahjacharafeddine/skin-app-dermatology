import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Diagnostic from './diagnostic';
import DiagnosticDetail from './diagnostic-detail';
import DiagnosticUpdate from './diagnostic-update';
import DiagnosticDeleteDialog from './diagnostic-delete-dialog';

const DiagnosticRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Diagnostic />} />
    <Route path="new" element={<DiagnosticUpdate />} />
    <Route path=":id">
      <Route index element={<DiagnosticDetail />} />
      <Route path="edit" element={<DiagnosticUpdate />} />
      <Route path="delete" element={<DiagnosticDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DiagnosticRoutes;
