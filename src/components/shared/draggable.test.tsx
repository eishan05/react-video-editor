import React from 'react';
import { render, screen } from '@testing-library/react';
import Draggable from './draggable';

// Mock createPortal since we're testing drag behavior
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('Draggable', () => {
  const TestChild = ({ children, ...props }: any) => (
    <div data-testid="draggable-child" {...props}>
      {children}
    </div>
  );

  describe('rendering', () => {
    it('should render children with draggable props', () => {
      render(
        <Draggable>
          <TestChild>Drag me</TestChild>
        </Draggable>
      );

      const child = screen.getByTestId('draggable-child');
      expect(child).toBeInTheDocument();
      expect(child).toHaveAttribute('draggable', 'true');
      expect(child).toHaveTextContent('Drag me');
    });

    it('should clone element with drag handlers', () => {
      render(
        <Draggable>
          <TestChild>Test Content</TestChild>
        </Draggable>
      );

      const child = screen.getByTestId('draggable-child');
      expect(child).toHaveAttribute('draggable', 'true');
    });
  });

  describe('props acceptance', () => {
    it('should accept custom preview props', () => {
      const CustomPreview = <div data-testid="custom-preview">Custom Preview</div>;
      
      render(
        <Draggable
          shouldDisplayPreview={true}
          renderCustomPreview={CustomPreview}
        >
          <TestChild>Drag me</TestChild>
        </Draggable>
      );

      const child = screen.getByTestId('draggable-child');
      expect(child).toHaveAttribute('draggable', 'true');
      expect(child).toBeInTheDocument();
    });

    it('should accept data prop', () => {
      const customData = { id: 'item-1', type: 'video', src: 'video.mp4' };
      
      render(
        <Draggable data={customData}>
          <TestChild>Drag me</TestChild>
        </Draggable>
      );

      const child = screen.getByTestId('draggable-child');
      expect(child).toHaveAttribute('draggable', 'true');
    });

    it('should work with default props', () => {
      render(
        <Draggable>
          <TestChild>Drag me</TestChild>
        </Draggable>
      );

      const child = screen.getByTestId('draggable-child');
      expect(child).toHaveAttribute('draggable', 'true');
    });
  });

  describe('component structure', () => {
    it('should render without errors', () => {
      const { unmount } = render(
        <Draggable>
          <TestChild>Test Component</TestChild>
        </Draggable>
      );

      const child = screen.getByTestId('draggable-child');
      expect(child).toBeInTheDocument();

      unmount();
    });

    it('should handle children with existing props', () => {
      render(
        <Draggable>
          <TestChild className="existing-class" data-custom="test">
            Drag me
          </TestChild>
        </Draggable>
      );

      const child = screen.getByTestId('draggable-child');
      expect(child).toHaveAttribute('draggable', 'true');
      expect(child).toHaveAttribute('data-custom', 'test');
      expect(child).toHaveClass('existing-class');
    });
  });
});