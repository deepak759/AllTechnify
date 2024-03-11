/* eslint-disable react/prop-types */
export default function Comments({comment}) {
    let {content,userName,avatar,createdAt}=comment
    createdAt=createdAt.substring(0,10)
  return (
    <div>
      <article>
        <div className="flex items-center mb-4">
          <img
            className="w-10 h-10 me-4 rounded-full"
            src={avatar}
            alt=""
          />
          <div className="font-medium dark:text-white">
            <p>
             {userName}
              <time
                dateTime="2014-08-16 19:00"
                className="block text-sm text-gray-500 dark:text-gray-400"
              >
                Commented on {createdAt}
              </time>
            </p>
          </div>
        </div>
        
       
       
        <p className="mb-2 text-gray-500 dark:text-gray-400">
         {content}
        </p>
       
        
       
      </article>
    </div>
  );
}
