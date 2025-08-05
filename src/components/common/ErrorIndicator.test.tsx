import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ErrorIndicator from './ErrorIndicator';

describe('ErrorIndicator', () => {
  it('should display the provided error message', () => {
    const errorMessage = 'An error has occurred.';
    render(<ErrorIndicator errorMessage={errorMessage} />);

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeVisible();
  });

  it('should display a different error message when a different prop is passed', () => {
    const errorMessage = 'Network request failed.';
    render(<ErrorIndicator errorMessage={errorMessage} />);

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeVisible();
  });

  it('should render with an empty message if an empty string is passed', () => {
    render(<ErrorIndicator errorMessage="" />);

    const errorText = screen.getByTestId('error-message');
    expect(errorText).toBeVisible();
    expect(errorText.props.children).toBe('');
  });
});