import React from 'react';
import { render, screen } from '@testing-library/react-native';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
  it('should render the activity indicator', () => {
    render(<LoadingIndicator />);
    const activityIndicator = screen.getByTestId('activity-indicator');
    expect(activityIndicator).toBeVisible();
  });

  it('should display the "Loading..." text', () => {
    render(<LoadingIndicator />);
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeVisible();
  });

});
