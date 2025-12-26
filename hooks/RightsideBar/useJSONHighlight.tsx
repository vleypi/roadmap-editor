import { useMemo } from 'react';

export const useJSONHighlight = (data: any) => {
  const highlighted = useMemo(() => {
    let keyCounter = 0;
    const getNextKey = () => `key-${keyCounter++}`;

    const highlightJSON = (obj: any, indent = 0): React.ReactElement[] => {
      const elements: React.ReactElement[] = [];
      const spaces = '  '.repeat(indent);

      if (obj === null) {
        elements.push(
          <span key={getNextKey()} className="text-night-400">null</span>
        );
      } else if (typeof obj === 'string') {
        elements.push(
          <span key={getNextKey()} className="text-green-400">"{obj}"</span>
        );
      } else if (typeof obj === 'number') {
        elements.push(
          <span key={getNextKey()} className="text-purple-400">{obj}</span>
        );
      } else if (typeof obj === 'boolean') {
        elements.push(
          <span key={getNextKey()} className="text-purple-400">
            {obj.toString()}
          </span>
        );
      } else if (Array.isArray(obj)) {
        if (obj.length === 0) {
          elements.push(
            <span key={getNextKey()} className="text-night-300">[]</span>
          );
        } else {
          elements.push(
            <span key={getNextKey()} className="text-night-300">[</span>
          );
          obj.forEach((item, index) => {
            elements.push(<br key={getNextKey()} />);
            elements.push(
              <span key={getNextKey()} className="text-night-300">
                {spaces + '  '}
              </span>
            );
            elements.push(...highlightJSON(item, indent + 1));
            if (index < obj.length - 1) {
              elements.push(
                <span key={getNextKey()} className="text-night-300">,</span>
              );
            }
          });
          elements.push(<br key={getNextKey()} />);
          elements.push(
            <span key={getNextKey()} className="text-night-300">
              {spaces}]
            </span>
          );
        }
      } else if (typeof obj === 'object') {
        const keys = Object.keys(obj);
        if (keys.length === 0) {
          elements.push(
            <span key={getNextKey()} className="text-night-300">
              &#123;&#125;
            </span>
          );
        } else {
          elements.push(
            <span key={getNextKey()} className="text-night-300">&#123;</span>
          );
          keys.forEach((key, index) => {
            elements.push(<br key={getNextKey()} />);
            elements.push(
              <span key={getNextKey()} className="text-night-300">
                {spaces + '  '}
              </span>
            );
            elements.push(
              <span key={getNextKey()} className="text-yellow-300">
                "{key}"
              </span>
            );
            elements.push(
              <span key={getNextKey()} className="text-night-300">: </span>
            );
            elements.push(...highlightJSON(obj[key], indent + 1));
            if (index < keys.length - 1) {
              elements.push(
                <span key={getNextKey()} className="text-night-300">,</span>
              );
            }
          });
          elements.push(<br key={getNextKey()} />);
          elements.push(
            <span key={getNextKey()} className="text-night-300">
              {spaces}&#125;
            </span>
          );
        }
      }

      return elements;
    };

    return highlightJSON(data);
  }, [data]);

  return highlighted;
};