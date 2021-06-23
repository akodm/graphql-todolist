import { useEffect, useMemo, useState } from 'react';
import { useTransition, animated } from 'react-spring';

export type AddFunction = (msg: string) => void;

interface IMessage {
  config?: {
    tension: number;
    friction: number;
    precision: number;
  };
  timeout?: number;
  children: (add: AddFunction) => void;
}

interface IAlert {
  key: number;
  msg: string;
}

let id = 0;

export default function Alert({
  config = { tension: 125, friction: 20, precision: 0.1 },
  timeout = 3000,
  children
}: IMessage) {
  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);
  const [items, setItems] = useState<IAlert[]>([]);

  const transitions = useTransition(items, {
    from: { opacity: 0, height: 0, life: '100%' },
    keys: item => item.key,
    enter: item => async (next, cancel) => {
      cancelMap.set(item, cancel);
      
      await next({ opacity: 1, height: refMap.get(item).offsetHeight });
      await next({ life: '0%' });
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (result, ctrl, item) => {
      setItems(state => state.filter(i => {
        return i.key !== item.key;
      }));
    },
    config: (item, idx, phase) => key => (phase === 'enter' && key === 'life' ? { duration: timeout } : config),
  });

  useEffect(() => {
    children((msg: string) => {
      setItems(state => [...state, { key: id++, msg }]);
    });
  }, [children]);

  return (
    <>
      {
        transitions(({ life, ...style }, item) => {
          return <animated.div style={style} ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)} className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md fixed bottom-8 right-5 cursor-pointer" role="alert" onClick={(e) => {
            e.stopPropagation();
            if(cancelMap.has(item)) {
              cancelMap.get(item)();
            }
          }}>
            <div className="flex">
              <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p className="font-bold">{item.msg}</p>
              </div>
            </div>
          </animated.div>
        })
      }
    </>
  )
};